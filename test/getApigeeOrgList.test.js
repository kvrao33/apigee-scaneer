const axios = require('axios');
const generateToken = require('../utility/generateToken.js');
const getApigeeOrgList = require('../utility/getOrglist.js');
const logger = require('../utility/logger.js');

jest.mock('axios');
jest.mock('../utility/generateToken.js');
jest.mock('../utility/logger.js');

describe('getApigeeOrgList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return the organization list on successful API call', async () => {
        const mockToken = 'mocked-token';
        const mockOrgList = { organizations: ['org1', 'org2', 'org3'] };

        generateToken.mockResolvedValue(mockToken);
        axios.get.mockResolvedValue({ data: mockOrgList });

        const result = await getApigeeOrgList();

        expect(generateToken).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith('https://apigee.googleapis.com/v1/organizations', {
            headers: {
                Authorization: `Bearer ${mockToken}`,
            },
        });
        expect(result).toEqual(mockOrgList.organizations);
    });

    test('should log an error and return undefined if the API call fails', async () => {
        const mockToken = 'mocked-token';
        const errorMessage = 'API request failed';

        generateToken.mockResolvedValue(mockToken);
        axios.get.mockRejectedValue(new Error(errorMessage));

        const result = await getApigeeOrgList();

        expect(generateToken).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith('https://apigee.googleapis.com/v1/organizations', {
            headers: {
                Authorization: `Bearer ${mockToken}`,
            },
        });
        expect(logger.error).toHaveBeenCalledWith('Error : ', errorMessage);
        expect(result).toBeUndefined();
    });
});
