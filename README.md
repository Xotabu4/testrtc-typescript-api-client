# JS/TS API client for testrtc.com service

API client (HTTP) to work testrtc.com . Based on https://apidoc.testrtc.com/ documentation (v1).

testrtc.com is a service that provides infrastructure and metrics analysis for video/audio call quality measurments with different conditions (network, location, browser and so on). Useful for testing webRTC applications.

This is **not** official client. Please create issue if you found some bugs, or have a question!

_____

## Thanks to [Doxy.me](https://doxy.me) for helping with development and using! 
## Doxy.me loves opensource!

______
### Install

```bash
npm i testrtc-typescript-api-client
```

You will need apiKey to work with this API - create one here - https://app.testrtc.com/app/settings

You can pass apiKey as client constructor param. 

```typescript
import { TestRTCApiClient } from 'testrtc-typescript-api-client'
const client = new TestRTCApiClient({
    apiKey: 'xxxx-xxx-xxx-xxxx'
})
```
Or, set it as env variable:
```
TESTRTC_API_KEY=xxx-xxx-xxx-xxx node ./your-script.js
```
If set as env variable - you can create TestRTCApiClient without options:
```typescript
const client = new TestRTCApiClient()
```
apiKey from constructor param has higher priority than environment variable.

____
### Usage demo

Since typings are included, follow your IDE suggestions when working with this package.

```typescript
// importing
import { TestRTCApiClient } from 'testrtc-typescript-api-client'

// creating client
const client = new TestRTCApiClient({
    apiKey: 'xxxx-xxx-xxx-xxxx'
})

// Getting all existing test cases
const testCases = await client.tests.getTests()

// Using native array methods to find needed test case
const smokeTest = testCases.find(testcase => testcase.name === 'smoke test')

// Launching test for this test case by testcase id
const launchedTest = await client.tests.runTest(smokeTest.id)

// Getting information about testRun
const testRunDetails = await client.testRuns.getDetailedTestRunInformation(launchedTest.testRunId)
```

See API docs for more details about available endpoints - https://apidoc.testrtc.com/
