# Unofficial JS/TS API client for testrtc.com service

Install:

```
npm i testrtc-typescript-api-client
```
 
Usage demo:
```
import {TestRTCApiClient} from 'testrtc-typescript-api-client'

const client = new TestRTCApiClient({
    apiKey: 'xxxx-xxx-xxx-xxxx'
})

const tests = await client.tests.getTests()

const launchedTest = await client.tests.runTest(tests[0].id)

const testRunDetails = await client.testRuns.getDetailedTestRunInformation(launchedTest.testRunId)
```
