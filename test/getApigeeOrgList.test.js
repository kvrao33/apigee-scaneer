// getApigeeOrgList.test.js
const axios = require('axios');
const generateToken = require('../utility/generateToken.js');
const getApigeeOrgList = require('../utility/getOrglist.js');

jest.mock('axios');
jest.mock('../utility/generateToken.js');

describe('getApigeeOrgList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return organization list on successful API call', async () => {
    // Mock the token generation and API response
    const mockToken = 'mocked_token';
    const mockOrganizations = ['org1', 'org2', 'org3'];

    generateToken.mockResolvedValue(mockToken);
    axios.get.mockResolvedValue({ data: { organizations: mockOrganizations } });

    const organizations = await getApigeeOrgList();

    expect(generateToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      'https://apigee.googleapis.com/v1/organizations',
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
    );
    expect(organizations).toEqual(mockOrganizations);
  });

  test('should log an error if API call fails', async () => {
    const mockToken = 'mocked_token';
    const errorMessage = 'API request failed';

    generateToken.mockResolvedValue(mockToken);
    axios.get.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn(); // Mock console.error

    const organizations = await getApigeeOrgList();

    expect(generateToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      'https://apigee.googleapis.com/v1/organizations',
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
    );
    expect(console.error).toHaveBeenCalledWith('Error : ', errorMessage);
    expect(organizations).toBeUndefined(); // As the function does not return anything on error
  });
});
