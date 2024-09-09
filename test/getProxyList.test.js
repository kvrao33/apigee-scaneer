// getProxyList.test.js
const axios = require('axios');
const generateToken = require('../utility/generateToken.js');
const getProxyList = require('../utility/getProxyList.js');

jest.mock('axios');
jest.mock('../utility/generateToken.js');

describe('getProxyList', () => {
  const mockOrgName = 'test-org';
  const mockAccessToken = 'mocked_token';
  const mockProxies = [
    { name: 'proxy1', revision: '1' },
    { name: 'proxy2', revision: '2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return the list of proxies on successful API call', async () => {
    // Mock the generateToken function to return a token
    generateToken.mockResolvedValue(mockAccessToken);

    // Mock the axios.get function to return a successful response
    axios.get.mockResolvedValue({ data: { proxies: mockProxies } });

    // Call the function
    const proxies = await getProxyList(mockOrgName);

    // Assertions
    expect(generateToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      `https://apigee.googleapis.com/v1/organizations/${mockOrgName}/apis`,
      {
        params: {
          includeRevisions: true,
        },
        headers: {
          Authorization: `Bearer ${mockAccessToken}`,
          Accept: 'application/json',
        },
      }
    );
    expect(proxies).toEqual(mockProxies);
  });

  test('should throw an error if the API call fails', async () => {
    // Mock the generateToken function to return a token
    generateToken.mockResolvedValue(mockAccessToken);

    // Mock the axios.get function to return a failed response
    const mockError = new Error('API request failed');
    axios.get.mockRejectedValue(mockError);

    // Assertions
    await expect(getProxyList(mockOrgName)).rejects.toThrow('API request failed');
    expect(generateToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalled();
  });
});
