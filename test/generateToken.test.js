// generateToken.test.js
const { GoogleAuth } = require('google-auth-library');
const generateToken = require('../utility/generateToken');

jest.mock('google-auth-library', () => {
  return {
    GoogleAuth: jest.fn(() => ({
      getClient: jest.fn(),
    })),
  };
});

describe('generateToken', () => {
  let mockGetClient;
  let mockGetAccessToken;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the methods
    mockGetClient = jest.fn();
    mockGetAccessToken = jest.fn();

    // Set up the mock implementation for GoogleAuth
    GoogleAuth.mockImplementation(() => ({
      getClient: mockGetClient,
    }));
  });

  test('should return the access token on successful token generation', async () => {
    const expectedToken = 'mocked_token';
    mockGetClient.mockResolvedValue({
      getAccessToken: mockGetAccessToken.mockResolvedValue({ token: expectedToken }),
    });

    const token = await generateToken();

    expect(GoogleAuth).toHaveBeenCalledWith({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });
    expect(mockGetClient).toHaveBeenCalled();
    expect(mockGetAccessToken).toHaveBeenCalled();
    expect(token).toBe(expectedToken);
  });

  test('should log an error when token generation fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const errorMessage = 'Token generation error';
    mockGetClient.mockRejectedValue(new Error(errorMessage));

    const token = await generateToken();

    expect(GoogleAuth).toHaveBeenCalledWith({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });
    expect(mockGetClient).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error generating token:', expect.any(Error));
    expect(token).toBeUndefined();

    consoleSpy.mockRestore();
  });
});
