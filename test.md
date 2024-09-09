# Apigee Linter Rules

This repository contains a work-in-progress list of linter rules for Apigee bundles. As product features evolve, new rules may be added and outdated ones deprecated.

## Linter Rules

| Category            | Status  | Code  | Name                                         | Description                                                                                                        |
|---------------------|---------|-------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **Bundle**           |         |       |                                              |                                                                                                                    |
|                     | ✅       | BN001 | Bundle folder structure correctness           | Bundles have a clear structure. This plugin ignores some files, like `.DS_store` and any file ending in `~`.        |
|                     | ✅       | BN002 | Extraneous files                             | Ensure each folder contains appropriate resources in the bundle.                                                   |
|                     | ✅       | BN003 | Cache Coherence                              | A bundle that includes cache reads should include cache writes with the same keys.                                  |
|                     | ◻️       | BN004 | Unused variables                             | Variables created should be used in conditions, resource callouts, or policies within a bundle.                    |
|                     | ✅       | BN005 | Unattached policies                          | Unattached policies are dead code and should be removed from production bundles.                                    |
|                     | ✅       | BN006 | Bundle size - policies                       | Large bundles are a symptom of poor design. A high number of policies predicts an oversized bundle.                |
|                     | ✅       | BN007 | Bundle size - resource callouts              | A high number of resource callouts can indicate underutilization of out-of-the-box Apigee policies.                |
|                     | ◻️       | BN008 | IgnoreUnresolvedVariables and FaultRules     | The use of `IgnoreUnresolvedVariables` without `FaultRules` may lead to unexpected errors.                         |
|                     | ✅       | BN009 | Statistics Collector - duplicate policies    | Warn on duplicate policies when no conditions are present or when conditions are duplicated.                       |
|                     | ✅       | BN010 | Missing policies                             | Issue an error if a referenced policy is not present in the bundle.                                                |
| **Proxy Definition** |         |       |                                              |                                                                                                                    |
|                     | ✅       | PD001 | RouteRules to Targets                        | RouteRules should map to defined Targets.                                                                          |
|                     | ✅       | PD002 | Unreachable Route Rules - defaults           | Only one `RouteRule` should be present without a condition.                                                        |
|                     | ✅       | PD003 | Unreachable Route Rules                      | `RouteRule` without a condition should be last.                                                                    |
|                     | ✅       | PD004 | ProxyEndpoint name                           | ProxyEndpoint name should match the basename of the file.                                                          |
|                     | ✅       | PD005 | VirtualHost                                  | ProxyEndpoint should have one `HTTPProxyConnection`. For profile `apigeex`, no VirtualHost should be used.         |
| **Target Definition**|         |       |                                              |                                                                                                                    |
|                     | ✅       | TD001 | Mgmt Server as Target                        | Discourage calls to the Management Server from a Proxy via target.                                                 |
|                     | ✅       | TD002 | Use Target Servers                           | Encourage the use of target servers.                                                                               |
|                     | ✅       | TD003 | TargetEndpoint name                          | TargetEndpoint name should match the basename of the file.                                                         |
|                     | ✅       | TD004 | TargetEndpoint SSLInfo                       | TargetEndpoint HTTPTargetConnection should enable TLS/SSL.                                                         |
|                     | ✅       | TD005 | TargetEndpoint SSLInfo references            | TargetEndpoint SSLInfo should use references for `KeyStore` and `TrustStore`.                                       |
| **Flow**             |         |       |                                              |                                                                                                                    |
|                     | ✅       | FL001 | Unconditional Flows                          | Only one unconditional flow will get executed. Error if more than one is detected.                                 |
| **Step**             |         |       |                                              |                                                                                                                    |
|                     | ✅       | ST001 | Empty Step                                  | Empty steps clutter the bundle.                                                                                    |
|                     | ✅       | ST002 | Step Structure                               | Each Step should have at most one Name element, one Condition element, no others.                                  |
|                     | ✅       | ST003 | Extract Variables Step with JSONPayload      | A check for message content should be performed before policy execution.                                           |
|                     | ✅       | ST004 | Extract Variables Step with XMLPayload       | A check for message content should be performed before policy execution.                                           |
|                     | ✅       | ST005 | Extract Variables Step with FormParam        | A check for message content should be performed before policy execution.                                           |
|                     | ✅       | ST006 | JSON Threat Protection Step                  | A check for message content should be performed before policy execution.                                           |
|                     | ✅       | ST007 | XML Threat Protection Step                   | A check for message content should be performed before policy execution.                                           |
| **Policy**           |         |       |                                              |                                                                                                                    |
|                     | ✅       | PO006 | Policy Name & filename agreement             | Policy name attribute should coincide with the policy filename.                                                    |
|                     | ✅       | PO007 | Policy Naming Conventions - type indication  | It is recommended that the policy name follow a pattern indicating the policy type.                                |
|                     | ✅       | PO008 | Policy DisplayName & DisplayName agreement   | Check that the policy filename matches the display name of the policy.                                             |
|                     | ◻️       | PO009 | Service Callout Target - Mgmt Server         | Targeting the management server may result in higher-than-expected latency; use with caution.                      |
|                     | ◻️       | PO010 | Service Callout Target - Target Server       | Encourage the use of target servers.                                                                               |
|                     | ◻️       | PO011 | Service Callout Target - Dynamic URLs        | Error on dynamic URLs in target server URL tag.                                                                    |
|                     | ✅       | PO012 | AssignMessage/AssignTo                       | Warn on unnecessary `AssignTo` in `AssignMessage` when `createNew` is false and no destination variable is present.|
|                     | ✅       | PO013 | Resource Call Out - Javascript               | Use JSHint, ESLint for validation.                                                                                 |
|                     | ◻️       | PO014 | Resource Call Out - Java                     | Use PMD, Checkstyle for validation.                                                                                |
|                     | ◻️       | PO015 | Resource Call Out - Python                   | Use Pylint for validation.                                                                                         |
|                     | ◻️       | PO016 | Statistics Collector - duplicate variables   | Warn on duplicate variables.                                                                                       |
|                     | ◻️       | PO017 | Misconfigured - FaultRules/Fault Rule in Policy | FaultRules are configured in ProxyEndpoints and TargetEndpoints.                                                 |
|                     | ✅       | PO018 | Regex Lookahead/Lookbehind - Threat Protection | Regular expressions with lookahead or lookbehind perform slowly on large payloads and are typically unnecessary.  |
|                     | ✅       | PO019 | Reserved words as variables - ServiceCallout Request | Using "request" as the name of a Request may cause unexpected side effects.                                       |
|                     | ✅       | PO020 | Reserved words as variables - ServiceCallout Response | Using "response" as the name of a Response may cause unexpected side effects.                                     |
|                     | ◻️       | PO021 | Statistics Collector - reserved variables    | Warn on insertion of duplicate variables.                                                                          |
|                     | ✅       | PO022 | Nondistributed Quota                         | Using nondistributed quota can result in higher-than-expected transactions due to autoscaling Message Processors.  |
|                     | ✅       | PO023 | Quota Policy Reuse                           | When reusing a Quota policy, ensure conditions of execution are mutually exclusive or intended for multiple counts.|
|                     | ✅       | PO024 | Cache Error Responses                        | Ensure conditions or configuration options are used to exclude non-200 responses from caching.                     |
|                     | ✅       | PO025 | EsLint Errors                                | Run EsLint on all policy resources.                                                                                |
|                     | ✅       | PO026 | AssignVariable Usage                         | Ensure proper usage of AssignMessage/AssignVariable elements.                                                      |
|                     | ✅       | PO027 | HMAC Usage                                   | Ensure that SecretKey is present and a private variable is referenced in the `ref=` attribute.                     |
|                     | ✅       | PO028 | Policy Availability in profile               | Check for policy availability in specific profiles.                                                                |
|                     | ✅       | PO029 | Known policy type                            | Ensure all policies are of a known type.                                                                           |
|                     | ✅       | PO030 | ExpirySettings                               | `ExpirySettings` should use exactly one child element, no deprecated elements.                                      |
|                     | ✅       | PO031 | AssignMessage content-type                   | When assigning to Payload, you should also assign `content-type`, exactly once.                                     |
|                     | ✅       | PO032 | CORS policy hygiene                          | Wildcard origins in CORS policies should generate a warning.                                                       |
| **FaultRules**       |         |       |                                              |                                                                                                                    |
|                     | ✅       | FR001 | No Condition on FaultRule                    | Use Condition elements on FaultRules, unless it's a fallback rule.                                                 |
|                     | ✅       | FR002 | DefaultFaultRule Structure                   | `DefaultFaultRule` should have only supported child elements.                                                      |
|                     | ✅       | FR003 | Single FaultRule                             | When a single FaultRule is present, consider using a `DefaultFaultRule`.                                           |
| **Resources**        |         |       |                                              |                                                                                                                    |
|                     | ✅       | RS001 | Static Resources                             | Static resources should not exceed 1MB in size.                                                                    |
