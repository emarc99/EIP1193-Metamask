/**
 * @typedef {Object} RequestArguments
 * @property {string} method - The RPC method to be called.
 * @property {Array|Object} [params] - Optional parameters for the method.
 */

/**
 * @typedef {Object} ProviderRpcError
 * @property {number} code - Error code.
 * @property {string} message - Error message.
 * @property {unknown} [data] - Additional data for the error.
 */

/**
 * @typedef {Object} ProviderMessage
 * @property {string} type - The type of message.
 * @property {unknown} data - The data associated with the message.
 */

/**
 * @typedef {ProviderMessage} EthSubscription
 * @property {Object} data - Subscription data.
 * @property {string} data.subscription - Subscription ID.
 * @property {unknown} data.result - Result of the subscription.
 */

/**
 * @typedef {Object} ProviderConnectInfo
 * @property {string} chainId - The ID of the connected blockchain network.
 */

/**
 * EIP-1193 Provider Interface
 * @typedef {Object} Provider
 * @property {function(RequestArguments): Promise<unknown>} request - Makes a request to the provider.
 * @property {function(string, function): void} on - Adds an event listener.
 * @property {function(string, function): void} removeListener - Removes an event listener.
 */
