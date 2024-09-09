// downloadAndUnzipProxy.test.js
const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const downloadAndUnzipProxy = require('../utility/getProxyBundle');

jest.mock('axios');
jest.mock('fs');
jest.mock('unzipper');

describe('downloadAndUnzipProxy', () => {
  const orgName = 'test-org';
  const proxyName = 'test-proxy';
  const rev = '1';
  const token = 'mock-token';
  const apiUrl = `https://apigee.googleapis.com/v1/organizations/${orgName}/apis/${proxyName}/revisions/${rev}?format=bundle`;
  const localFilePath = path.join(process.cwd()+'/proxyBundle', `${proxyName}.zip`);
  const localUnzipPath = path.join(process.cwd()+'/proxyBundle', `${proxyName}_rev${rev}`);

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
    axios.mockRejectedValue({
      response: { data: 'Error data', status: 400, headers: {} },
    });

    console.error = jest.fn();

    const result = await downloadAndUnzipProxy(orgName, proxyName, rev, token);

    expect(console.error).toHaveBeenCalledWith('Error response data:', 'Error data');
    expect(console.error).toHaveBeenCalledWith('Error response status:', 400);

    expect(result).toBe(localUnzipPath);
    expect(fs.unlinkSync).toHaveBeenCalledWith(localFilePath); // Clean-up should still occur
  });

  // Additional test cases for request errors, unexpected errors, etc. can be added here.
});
