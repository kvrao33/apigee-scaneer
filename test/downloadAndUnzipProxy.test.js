const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const downloadAndUnzipProxy = require('../utility/getProxyBundle.js');
const logger = require('../utility/logger.js');

jest.mock('axios');
jest.mock('fs');
jest.mock('unzipper');
jest.mock('../utility/logger.js');

describe('downloadAndUnzipProxy', () => {
  const orgName = 'test-org';
  const proxyName = 'test-proxy';
  const rev = '1';
  const token = 'mock-token';
  const apiUrl = `https://apigee.googleapis.com/v1/organizations/${orgName}/apis/${proxyName}/revisions/${rev}?format=bundle`;
  const localFilePath = path.join(process.cwd() + '/proxyBundle', `${proxyName}.zip`);
  const localUnzipPath = path.join(process.cwd() + '/proxyBundle', `${proxyName}_rev${rev}`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should download, save, unzip, and clean up the proxy bundle successfully', async () => {
    const mockStream = { pipe: jest.fn() };
    const mockWriter = { on: jest.fn((event, cb) => cb()) };
    const mockExtract = { promise: jest.fn().mockResolvedValue() };

    axios.mockResolvedValue({ data: mockStream });
    fs.createWriteStream.mockReturnValue(mockWriter);
    fs.createReadStream.mockReturnValue(mockStream);
    unzipper.Extract.mockReturnValue(mockExtract);
    fs.unlinkSync.mockReturnValue();

    const result = await downloadAndUnzipProxy(orgName, proxyName, rev, token);

    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: apiUrl,
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'stream',
    });

    expect(mockStream.pipe).toHaveBeenCalledWith(mockWriter);
    expect(fs.createWriteStream).toHaveBeenCalledWith(localFilePath);
    expect(fs.createReadStream).toHaveBeenCalledWith(localFilePath);
    expect(unzipper.Extract).toHaveBeenCalledWith({ path: localUnzipPath });
    expect(fs.unlinkSync).toHaveBeenCalledWith(localFilePath);

    expect(result).toBe(localUnzipPath);
  });

  test('should handle API error gracefully', async () => {
    const errorResponse = {
      response: {
        data: 'Error data',
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    };
    axios.mockRejectedValue(errorResponse);

    logger.error = jest.fn(); // Mock the logger

    const result = await downloadAndUnzipProxy(orgName, proxyName, rev, token);

    expect(logger.error).toHaveBeenCalledWith('Error response data:Error data');
    expect(logger.error).toHaveBeenCalledWith('Error response status:400');
    expect(logger.error).toHaveBeenCalledWith('Error response headers:[object Object]');
    expect(result).toBe(localUnzipPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(localFilePath);
  });

  test('should log request error if no response is received', async () => {
    axios.mockRejectedValue({ request: 'Error request' });

    logger.error = jest.fn(); // Mock the logger

    const result = await downloadAndUnzipProxy(orgName, proxyName, rev, token);

    expect(logger.error).toHaveBeenCalledWith('Error request:Error request');
    expect(result).toBe(localUnzipPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(localFilePath);
  });

  test('should log generic error message if something unexpected happens', async () => {
    axios.mockRejectedValue({ message: 'Unexpected error', config: {} });

    logger.error = jest.fn(); // Mock the logger

    const result = await downloadAndUnzipProxy(orgName, proxyName, rev, token);

    expect(logger.error).toHaveBeenCalledWith('Error message:Unexpected error');
    // expect(logger.error).toHaveBeenCalledWith('Error config:{}');
    expect(result).toBe(localUnzipPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(localFilePath);
  });
});
