
## Rules

The list of rules is a work in progress. We expect it to increase over time. As
product features change (new policies, deprecated policies, etc), we will change rules as
well.

This is the current list:

| Linter | Status | Code | Name | Description |
| ------ | ------ | ---- | ---- | ----------- |
| Bundle | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| BN001 | Bundle folder structure correctness.  | Bundles have a clear structure. This plugin ignores some files, like .DS\_store and any file ending in ~. |
| &nbsp; |:white_medium_square:| BN002 | Extraneous files. | Ensure each folder contains appropriate resources in the bundle. |
| &nbsp; |:white_check_mark:| BN003 | Cache Coherence | A bundle that includes cache reads should include cache writes with the same keys. |
| &nbsp; |:white_medium_square:| BN004 | Unused variables. |  Within a bundle variables created should be used in conditions, resource callouts, or policies. |
| &nbsp; |:white_check_mark:| BN005 | Unattached policies. |  Unattached policies are dead code and should be removed from production bundles. |
| &nbsp; |:white_check_mark:| BN006 | Bundle size - policies. |  Large bundles are a symptom of poor design. A high number of policies is predictive of an oversized bundle. |
| &nbsp; |:white_check_mark:| BN007 | Bundle size - resource callouts. |  Large bundles are a symptom of poor design. A high number of resource callouts is indicative of underutilizing out of the box Apigee policies. |
| &nbsp; |:white_medium_square:| BN008 | IgnoreUnresolvedVariables and FaultRules |  Use of IgnoreUnresolvedVariables without the use of FaultRules may lead to unexpected errors. |
| &nbsp; |:white_check_mark:| BN009 | Statistics Collector - duplicate policies |  Warn on duplicate policies when no conditions are present or conditions are duplicates. |
| &nbsp; |:white_check_mark:| BN010 | Missing policies | Issue an error if a referenced policy is not present in the bundle. |
| &nbsp; |:white_check_mark:| BN011 | Check each XML file for well-formedness.|
| &nbsp; |:white_check_mark:| BN012 | unreferrenced Target Endpoints | Check that each TargetEndpoint can be reached. |
| &nbsp; |:white_check_mark:| BN013 | Unreferenced resources. | Warn for resources that not referenced in any policy. Unreferenced resources are dead code. |
| Proxy Definition | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| PD001 | RouteRules to Targets | RouteRules should map to defined Targets. |
| &nbsp; |:white_check_mark:| PD002 | Unreachable Route Rules - defaults |  Only one RouteRule should be present without a condition. |
| &nbsp; |:white_check_mark:| PD003 | Unreachable Route Rules |  RouteRule without a condition should be last. |
| &nbsp; |:white_check_mark:| PD004 | ProxyEndpoint name | ProxyEndpoint name should match basename of filename. |
| &nbsp; |:white_check_mark:| PD005 | VirtualHost | ProxyEndpoint should have one HTTPProxyConnection, and in the case of profile=apigeex, no VirtualHost. |
| Target Definition | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| TD001 | Mgmt Server as Target |  Discourage calls to the Management Server from a Proxy via target. |
| &nbsp; |:white_check_mark:| TD002 | Use Target Servers |  Encourage the use of target servers. |
| &nbsp; |:white_check_mark:| TD003 | TargetEndpoint name | TargetEndpoint name should match basename of filename. |
| &nbsp; |:white_check_mark:| TD004 | TargetEndpoint SSLInfo | TargetEndpoint HTTPTargetConnection should enable TLS/SSL. |
| &nbsp; |:white_check_mark:| TD005 | TargetEndpoint SSLInfo references | TargetEndpoint SSLInfo should use references for KeyStore and TrustStore. |
| &nbsp; |:white_check_mark:| TD006 | TargetEndpoint SSLInfo | When using a LoadBalancer, the SSLInfo should not be configured under HTTPTargetConnection. |
| &nbsp; |:white_check_mark:| TD007 | TargetEndpoint SSLInfo | TargetEndpoint HTTPTargetConnection SSLInfo should use TrustStore. |
| Flow | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| FL001 | Unconditional Flows |  Only one unconditional flow will get executed. Error if more than one was detected. |
| Step | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| ST001 | Empty Step | Empty steps clutter the bundle. |
| &nbsp; |:white_check_mark:| ST002 | Step Structure | each Step should have at most one Name element, one Condition element, no others. |
| &nbsp; |:white_check_mark:| ST003 | Extract Variables Step with JSONPayload | A check for message content should be performed before policy execution. |
| &nbsp; |:white_check_mark:| ST004 | Extract Variables Step with XMLPayload | A check for message content should be performed before policy execution. |
| &nbsp; |:white_check_mark:| ST005 | Extract Variables Step with FormParam | A check for message content should be performed before policy execution. |
| &nbsp; |:white_check_mark:| ST006 | JSON Threat Protection Step | A check for message content should be performed before policy execution. |
| &nbsp; |:white_check_mark:| ST007 | XML Threat Protection Step | A check for message content should be performed before policy execution. |
| Policy | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| PO006 | Policy Name &amp; filename agreement |  Policy name attribute should coincide with the policy filename. |
| &nbsp; |:white_check_mark:| PO007 | Policy Naming Conventions - type indication |  It is recommended that the policy name use a prefix or follow a pattern that indicates the policy type. |
| &nbsp; |:white_check_mark:| PO008 | Policy DisplayName &amp; DisplayName agreement |  Check that the policy filename matches the display name of the policy. |
| &nbsp; |:white_medium_square:| PO009 | Service Callout Target - Mgmt Server |  Targeting management server may result in higher than expected latency; use with caution. |
| &nbsp; |:white_medium_square:| PO010 | Service Callout Target - Target Server |  Encourage use of target servers. |
| &nbsp; |:white_medium_square:| PO011 | Service Callout Target - Dynamic URLs |  Error on dynamic URLs in target server URL tag. |
| &nbsp; |:white_check_mark:| PO012 | AssignMessage/AssignTo | Warn on unnecessary AssignTo in AssignMessage when createNew is false and no destination variable. |
| &nbsp; |:white_check_mark:| PO013 | Resource Call Out - Javascript |  JSHint, ESLint. |
| &nbsp; |:white_medium_square:| PO014 | Resource Call Out - Java |  PMD, Checkstyle. |
| &nbsp; |:white_medium_square:| PO015 | Resource Call Out - Python |  Pylint. |
| &nbsp; |:white_medium_square:| PO016 | Statistics Collector - duplicate variables |  Warn on duplicate variables. |
| &nbsp; |:white_medium_square:| PO017 | Misconfigured - FaultRules/Fault Rule in Policy |  FaultRules are configured in ProxyEndpoints and TargetEndpoints. |
| &nbsp; |:white_check_mark:| PO018 | Regex Lookahead/Lookbehind are Expensive - Threat Protection Policy |  Regular expressions that include lookahead or lookbehind perform slowly on large payloads and are typically not required.|
| &nbsp; |:white_check_mark:| PO019 | Reserved words as variables - ServiceCallout Request |  Using "request" as the name of a Request may cause unexpected side effects.|
| &nbsp; |:white_check_mark:| PO020 | Reserved words as variables - ServiceCallout Response |  Using "response" as the name of a Response may cause unexpected side effects.|
| &nbsp; |:white_medium_square:| PO021 | Statistics Collector - reserved variables |  Warn on insertion of duplicate variables. |
| &nbsp; |:white_check_mark:| PO022 | Nondistributed Quota | When using nondistributed quota the number of allowed calls is influenced by the number of Message Processors (MPs) deployed. This may lead to higher than expected transactions for a given quota as MPs now autoscale. |
| &nbsp; |:white_check_mark:| PO023 | Quota Policy Reuse | When the same Quota policy is used more than once you must ensure that the conditions of execution are mutually exclusive or that you intend for a call to count more than once per message processed. |
| &nbsp; |:white_check_mark:| PO024 | Cache Error Responses | By default the ResponseCache policy will cache non 200 responses. Either create a condition or use policy configuration options to exclude non 200 responses. |
| &nbsp; |:white_check_mark:| PO025 | EsLint Errors | Runs EsLint on all policy resources. |
| &nbsp; |:white_check_mark:| PO026 | AssignVariable Usage | With AssignMessage/AssignVariable, check various usage issues. Example: The Name element must be present. The Ref element, if any, should not be surrounded in curlies. And so on. |
| &nbsp; |:white_check_mark:| PO027 | HMAC Usage | With HMAC, check that the SecretKey is present and that a ref= attribute refers to a private variable. |
| &nbsp; |:white_check_mark:| PO028 | Policy Availability in profile | Check for policies available in particular profiles. |
| &nbsp; |:white_check_mark:| PO029 | Known policy type | Check that all policies are of a known type. |
| &nbsp; |:white_check_mark:| PO030 | ExpirySettings | ExpirySettings should use exactly one child element, no deprecated elements. |
| &nbsp; |:white_check_mark:| PO031 | AssignMessage content-type | When assigning to Payload, you should also assign content-type, exactly once. |
| &nbsp; |:white_check_mark:| PO032 | CORS policy hygiene | In a CORS policy, wildcard origins should generate a warning. And other hygiene checks.|
| &nbsp; |:white_check_mark:| PO033 | ExtractVariables policy hygiene | In an ExtractVariables policy, check variable types and other hygiene. |
| &nbsp; |:white_check_mark:| PO034 | AssignMessage policy hygiene | In an AssignMessage policy, check element placement and other hygiene. |
| &nbsp; |:white_check_mark:| PO035 | Quota policy hygiene | In a Quota policy, check element placement and other hygiene. |
| FaultRules | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| FR001 | No Condition on FaultRule | Use Condition elements on FaultRules, unless it is the fallback rule. |
| &nbsp; |:white_check_mark:| FR002 | DefaultFaultRule Structure | DefaultFaultRule should have only supported child elements, at most one AlwaysEnforce element, and at most one Condition element. |
| &nbsp; |:white_check_mark:| FR003 | single FaultRule | When a single FaultRule is present, consider using a DefaultFaultRule. |
| Conditional | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| CC001 | Literals in Conditionals |  Warn on literals in any conditional statement. |
| &nbsp; |:white_medium_square:| CC002 | Null Blank Checks |  Blank checks should also check for null conditions. (to be reviewed) |
| &nbsp; |:white_check_mark:| CC003 | Long condition statement |  Conditions should not be long. |
| &nbsp; |:white_check_mark:| CC004 | Overly complex condition |  Condition complexity should be limited to fix number of variables and conjunctions. |
| &nbsp; |:white_check_mark:| CC005 | unterminated strings in Condition |  Strings within a Condition element must be properly wrapped by double quotes. |
| &nbsp; |:white_check_mark:| CC006 | Detect logical absurdities |  Conditions should not have internal logic conflicts - warn when these are detected. |
| &nbsp; |:white_check_mark:| CC007 | Check validity of expression syntax | Condition expressions should use valid syntax. No single quotes, no extraneous or unmatched parens, etc. |
| Endpoints | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| EP001 | CORS Policy attachment | Check for multiple CORS policies, or attachment to Target Endpoint. |
| &nbsp; |:white_check_mark:| EP002 | Misplaced Elements | Check for commonly misplaced configuration elements in Proxy and Target Endpoints. |
| Features | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| FE001 | Use of Authentication element | Check for the Authentication element in policies or in Target Endpoints. |
| Deprecation | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; |:white_check_mark:| DC001 | ConcurrentRateLimit Policy Deprecation |  Check usage of deprecated policy ConcurrentRateLimit. |
| &nbsp; |:white_check_mark:| DC002 | OAuth V1 Policies Deprecation |  Check usage of deprecated OAuth V1 policies. |
