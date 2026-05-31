import type { Lab } from '../types'

/**
 * Interactive labs. Each lab carries its own front-end-only sandbox definition
 * (mock data + expected answer + hints), so nothing here touches a real network.
 */
export const labs: Lab[] = [
  /* ---------------------------------------------------------------- */
  /* Stage 1 · Foundation · SOC — log parsing flag hunt               */
  /* ---------------------------------------------------------------- */
  {
    id: 'log-flag',
    title: 'Find the Flag in the Log File',
    stage: 1,
    track: 'soc',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    description:
      'Analysts live in logs. Somewhere in this noisy auth log, a single line hides a flag. Read carefully and extract it.',
    prerequisites: ['Comfort reading plain-text logs', 'Know what a timestamped log line looks like'],
    steps: [
      'Scan the log block below line by line.',
      'Most lines are normal SSH activity — ignore them.',
      'Spot the one line that contains a flag{...} token.',
      'Type the full flag (including the flag{} wrapper) into the box and submit.',
    ],
    sandboxType: 'flagInput',
    sandbox: {
      type: 'flagInput',
      mono: true,
      content: `Apr 12 09:14:02 web01 sshd[2011]: Accepted password for deploy from 10.0.2.4 port 51514
Apr 12 09:15:31 web01 sshd[2014]: Failed password for invalid user admin from 203.0.113.9 port 40221
Apr 12 09:16:00 web01 cron[3001]: (root) CMD (/usr/bin/backup.sh)
Apr 12 09:16:44 web01 sshd[2090]: Accepted publickey for analyst from 10.0.2.9 port 51840
Apr 12 09:17:10 web01 app[4120]: DEBUG token issued flag{basic_log_parsing} for session 88af2
Apr 12 09:17:55 web01 sshd[2102]: Failed password for invalid user test from 198.51.100.7 port 39912
Apr 12 09:18:21 web01 cron[3010]: (root) CMD (/usr/bin/cleanup.sh)`,
      prompt: 'Enter the flag you found:',
      placeholder: 'flag{...}',
      answers: ['flag{basic_log_parsing}'],
      hints: [
        'Flags follow the format flag{some_text}.',
        'Look at the application (app[...]) line, not the SSH lines.',
        'The flag is on the DEBUG line at 09:17:10.',
      ],
      successMessage: 'Nice parsing! You isolated the signal from the noise — core SOC skill #1.',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 1 · Foundation · SOC — HTTP request inspection             */
  /* ---------------------------------------------------------------- */
  {
    id: 'http-inspect',
    title: 'Inspect a Fake HTTP Request',
    stage: 1,
    track: 'soc',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    description:
      'Every web attack and defense starts with understanding HTTP. Read this captured request/response pair and answer what the response status code means.',
    prerequisites: ['Basic idea of HTTP methods', 'Awareness that responses carry status codes'],
    steps: [
      'Read the raw HTTP request and the server response below.',
      'Identify the HTTP method and the status code returned.',
      'Recall what that status code class signifies.',
      'Choose the correct interpretation.',
    ],
    sandboxType: 'multipleChoice',
    sandbox: {
      type: 'multipleChoice',
      mono: true,
      content: `POST /api/login HTTP/1.1
Host: portal.cyber-vidya.test
Content-Type: application/json
Authorization: Basic ZGVtbzpkZW1v

{"user":"demo","pass":"demo"}

--- response ---
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="portal"
Content-Length: 27

{"error":"invalid creds"}`,
      prompt: 'What does the server response tell us?',
      options: [
        { id: 'a', label: 'The request succeeded and a session was created.' },
        { id: 'b', label: 'Authentication failed — the credentials were rejected (401).' },
        { id: 'c', label: 'The page was permanently moved to a new URL.' },
        { id: 'd', label: 'The server crashed due to an internal error.' },
      ],
      correct: ['b'],
      multiple: false,
      hints: [
        'Look at the numeric status code on the first response line.',
        '4xx codes mean the client side of the exchange has a problem.',
        '401 specifically means "Unauthorized".',
      ],
      successMessage: 'Correct — 401 Unauthorized means the credentials were rejected. You can read HTTP!',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 2 · Core Security · SOC (Blue) — brute force detection     */
  /* ---------------------------------------------------------------- */
  {
    id: 'brute-force',
    title: 'Detect the Brute-Force Attempt',
    stage: 2,
    track: 'soc',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    description:
      'A wall of login events just hit your SIEM. One source IP is hammering the login endpoint. Find the attacker by spotting the anomalous pattern.',
    prerequisites: ['log-flag lab', 'Understand what a failed-login spike looks like'],
    steps: [
      'Review the login-attempt table below.',
      'Count failures per source IP and watch the timestamps.',
      'Normal users fail once or twice — an attacker fails many times in seconds.',
      'Select the row of the suspicious IP and submit.',
    ],
    sandboxType: 'ipSelection',
    sandbox: {
      type: 'ipSelection',
      prompt: 'Click the row of the IP responsible for the brute-force attack, then submit.',
      columns: ['Time', 'Source IP', 'User', 'Result'],
      rows: [
        { id: 'r1', cells: ['09:01:02', '10.0.4.8', 'priya', 'success'] },
        { id: 'r2', cells: ['09:01:05', '45.137.21.9', 'admin', 'failed'] },
        { id: 'r3', cells: ['09:01:06', '45.137.21.9', 'admin', 'failed'] },
        { id: 'r4', cells: ['09:01:07', '45.137.21.9', 'root', 'failed'] },
        { id: 'r5', cells: ['09:01:08', '45.137.21.9', 'root', 'failed'] },
        { id: 'r6', cells: ['09:01:09', '45.137.21.9', 'oracle', 'failed'] },
        { id: 'r7', cells: ['09:02:11', '10.0.4.21', 'rahul', 'success'] },
        { id: 'r8', cells: ['09:03:40', '10.0.4.8', 'priya', 'success'] },
      ],
      correct: ['r2', 'r3', 'r4', 'r5', 'r6'],
      hints: [
        'One IP appears far more often than any other.',
        'Look for many failures from the same source within a few seconds.',
        'The attacker is cycling usernames (admin, root, oracle) from 45.137.21.9.',
      ],
      successMessage: '45.137.21.9 — five failed logins in five seconds across multiple users. Textbook brute force. Block it!',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 2 · Core Security · Pentest (Offensive) — param tampering  */
  /* ---------------------------------------------------------------- */
  {
    id: 'param-tamper',
    title: 'Parameter Tampering Mini-CTF',
    stage: 2,
    track: 'pentest',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    description:
      'A rewards page trusts the client too much. The price comes from a URL parameter. Tamper with it to unlock the hidden flag.',
    prerequisites: ['Understand URL query parameters', 'http-inspect lab'],
    steps: [
      'Look at the simulated request URL below.',
      'Notice the ?price= parameter controls the value the server trusts.',
      'The flag unlocks when the price is set to 0 (a free purchase the app should never allow).',
      'Edit the URL so price=0 and submit it.',
    ],
    sandboxType: 'flagInput',
    sandbox: {
      type: 'flagInput',
      mono: true,
      content: `GET /shop/checkout?item=cyber-course&price=4999&qty=1 HTTP/1.1
Host: shop.cyber-vidya.test

# The server blindly trusts the price parameter sent by the client.
# Resubmit the request with the price tampered to 0 to grab the flag.`,
      prompt: 'Paste the tampered request line (or just the query string) with price set to 0:',
      placeholder: '/shop/checkout?item=cyber-course&price=0&qty=1',
      answers: [
        '/shop/checkout?item=cyber-course&price=0&qty=1',
        'GET /shop/checkout?item=cyber-course&price=0&qty=1 HTTP/1.1',
        'item=cyber-course&price=0&qty=1',
        'price=0',
      ],
      hints: [
        'You only need to change one number in the query string.',
        'Set price=4999 to price=0.',
        'Submitting anything containing price=0 will reveal the flag.',
      ],
      successMessage:
        'Boom — flag{client_side_trust_is_broken}. You just exploited insecure trust in client input. Never trust the client!',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 2 · Pentest — base64 decode                                */
  /* ---------------------------------------------------------------- */
  {
    id: 'b64-decode',
    title: 'Decode the Hidden String',
    stage: 2,
    track: 'pentest',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    description:
      'Encoding is not encryption. This token is just Base64. Decode it to reveal the flag inside.',
    prerequisites: ['Know what Base64 looks like', 'Access to any decoder (or your head!)'],
    steps: [
      'Take the Base64 string shown below.',
      'Decode it (CyberChef, a terminal `base64 -d`, or browser devtools all work).',
      'The decoded text is the flag.',
      'Enter the decoded flag and submit.',
    ],
    sandboxType: 'flagInput',
    sandbox: {
      type: 'flagInput',
      mono: true,
      content: `Recovered from a captured packet:

ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259`,
      prompt: 'Enter the decoded flag:',
      placeholder: 'flag{...}',
      answers: ['flag{base64_is_not_encryption}'],
      hints: [
        'The "=" padding and A–Z/a–z/0–9 charset is a giveaway: this is Base64.',
        'In a terminal: echo "ZmxhZ3t...fQ==" | base64 -d',
        'It decodes to a flag reminding you that encoding ≠ encryption.',
      ],
      successMessage: 'Decoded! flag{base64_is_not_encryption} — remember, Base64 hides nothing from an attacker.',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 3 · Cloud — misconfigured S3 bucket                        */
  /* ---------------------------------------------------------------- */
  {
    id: 's3-misconfig',
    title: 'Identify the Misconfigured Cloud Bucket',
    stage: 3,
    track: 'cloud',
    difficulty: 'Advanced',
    estimatedMinutes: 15,
    description:
      'Public buckets leak data daily. Review this storage bucket policy and pick the field that exposes it to the whole internet.',
    prerequisites: ['Basic cloud IAM concepts', 'Comfort reading JSON'],
    steps: [
      'Read the bucket configuration JSON below.',
      'Check who the policy grants access to and what they can do.',
      'A least-privilege bucket should never grant read to everyone (a wildcard principal).',
      'Select the misconfigured field and submit.',
    ],
    sandboxType: 'multipleChoice',
    sandbox: {
      type: 'multipleChoice',
      mono: true,
      content: `{
  "Bucket": "cv-student-records",
  "Region": "ap-south-1",
  "Encryption": "AES-256",
  "Versioning": "Enabled",
  "PublicAccessBlock": false,
  "Policy": {
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::cv-student-records/*"
  }
}`,
      prompt: 'Which setting makes this bucket dangerously exposed? (select all that apply)',
      options: [
        { id: 'enc', label: 'Encryption: AES-256' },
        { id: 'ver', label: 'Versioning: Enabled' },
        { id: 'pab', label: 'PublicAccessBlock: false' },
        { id: 'prin', label: 'Policy Principal: "*" (everyone) with s3:GetObject' },
      ],
      correct: ['pab', 'prin'],
      multiple: true,
      hints: [
        'Encryption and versioning are good practices — not the problem here.',
        'Think about who can reach the data and whether public access is blocked.',
        'A wildcard Principal "*" plus PublicAccessBlock=false = world-readable bucket.',
      ],
      successMessage:
        'Exactly. Principal "*" grants read to the entire internet and PublicAccessBlock is off — flag{public_bucket_data_leak}.',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 3 · GRC — control-to-gap mapping                           */
  /* ---------------------------------------------------------------- */
  {
    id: 'grc-control',
    title: 'Map the Control to the Compliance Gap',
    stage: 3,
    track: 'grc',
    difficulty: 'Intermediate',
    estimatedMinutes: 12,
    description:
      'An auditor flagged a finding. Pick the ISO 27001 / NIST control that directly remediates the described gap.',
    prerequisites: ['Awareness of security control frameworks', 'No coding required'],
    steps: [
      'Read the audit finding below.',
      'Consider which control domain addresses the root cause.',
      'Match the gap to the single best-fit control.',
      'Select your answer and submit.',
    ],
    sandboxType: 'multipleChoice',
    sandbox: {
      type: 'multipleChoice',
      content:
        'Audit finding: "Three former employees still have active VPN and email accounts 60 days after their last working day. No review process exists for deactivating access when staff leave."',
      prompt: 'Which control best remediates this gap?',
      options: [
        { id: 'a', label: 'Encrypt all data at rest with AES-256.' },
        { id: 'b', label: 'Access provisioning & timely de-provisioning (joiner/mover/leaver) review.' },
        { id: 'c', label: 'Install antivirus on all endpoints.' },
        { id: 'd', label: 'Conduct annual fire-drill evacuations.' },
      ],
      correct: ['b'],
      multiple: false,
      hints: [
        'The finding is about accounts that should have been removed.',
        'This is an identity & access management lifecycle issue.',
        'Look for the option about de-provisioning leavers.',
      ],
      successMessage:
        'Right control, right gap. Joiner/Mover/Leaver access reviews close this finding — flag{access_lifecycle_governance}.',
    },
  },

  /* ---------------------------------------------------------------- */
  /* Stage 3 · SOC / DFIR — data exfiltration spot                    */
  /* ---------------------------------------------------------------- */
  {
    id: 'exfil-spot',
    title: 'Spot the Data Exfiltration',
    stage: 3,
    track: 'soc',
    difficulty: 'Advanced',
    estimatedMinutes: 15,
    description:
      'Most outbound traffic is tiny. One host just pushed a suspiciously large transfer to an unknown external IP. Find the exfiltration.',
    prerequisites: ['brute-force lab', 'Understand normal vs anomalous traffic volume'],
    steps: [
      'Review the outbound netflow summary below.',
      'Normal sessions move kilobytes; exfiltration moves megabytes/gigabytes to odd destinations.',
      'Find the internal host sending an abnormal volume to an external IP.',
      'Select that row and submit.',
    ],
    sandboxType: 'ipSelection',
    sandbox: {
      type: 'ipSelection',
      prompt: 'Select the netflow row that represents data exfiltration, then submit.',
      columns: ['Internal Host', 'Destination IP', 'Port', 'Bytes Out'],
      rows: [
        { id: 'r1', cells: ['10.0.5.10', '142.250.envel', '443', '38 KB'] },
        { id: 'r2', cells: ['10.0.5.11', '52.96.x.x', '443', '120 KB'] },
        { id: 'r3', cells: ['10.0.5.12', '185.220.101.4', '8443', '2.4 GB'] },
        { id: 'r4', cells: ['10.0.5.13', '13.107.x.x', '443', '64 KB'] },
        { id: 'r5', cells: ['10.0.5.10', '142.250.envel', '443', '12 KB'] },
      ],
      correct: ['r3'],
      hints: [
        'Compare the "Bytes Out" column across rows.',
        'One value is orders of magnitude larger than the rest.',
        '10.0.5.12 pushed 2.4 GB to an unfamiliar IP on a non-standard port — that is the exfiltration.',
      ],
      successMessage:
        '2.4 GB to 185.220.101.4 on port 8443 — that host is exfiltrating data. flag{abnormal_egress_detected}. Isolate it now!',
    },
  },
]

/** Quick lookup by id (used by track → lab linking). */
export const labsById: Record<string, Lab> = Object.fromEntries(
  labs.map((l) => [l.id, l]),
)
