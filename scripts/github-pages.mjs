import { spawnSync } from 'node:child_process';

// Use the existing Git credential helper only for its authorized GitHub host.
// Credentials stay in process memory and are never printed or persisted.
const result = spawnSync('git', ['credential', 'fill'], {
  input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8',
  env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
});
if (result.status !== 0) throw new Error('No existing GitHub credential is available. Sign in with Git Credential Manager and retry.');
const token = result.stdout.split('\n').find(line => line.startsWith('password='))?.slice(9);
if (!token) throw new Error('The Git credential helper did not return a credential.');
const repo = 'LeNgocPhuongTrinh/lengocphuongtrinh.github.io';
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' };
const action = process.argv[2] || 'status';
async function request(path, method = 'GET', body) {
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(`GitHub ${method} ${path}: ${response.status} ${data?.message || ''}`);
  return data;
}
if (action === 'status') {
  const pages = await request('/pages');
  console.log(JSON.stringify({ url: pages.html_url, status: pages.status, source: pages.source, build_type: pages.build_type }));
  const runs = await request('/actions/runs?per_page=3');
  console.log(JSON.stringify(runs.workflow_runs.map(run => ({ id: run.id, name: run.name, status: run.status, conclusion: run.conclusion, url: run.html_url, sha: run.head_sha }))));
} else if (action === 'enable-workflow') {
  await request('/pages', 'PUT', { build_type: 'workflow' });
  console.log('GitHub Pages configured for Actions deployments.');
} else if (action === 'dispatch') {
  await request('/actions/workflows/deploy.yml/dispatches', 'POST', { ref: 'main' });
  console.log('Requested portfolio deployment.');
} else if (action === 'jobs') {
  const jobs = await request(`/actions/runs/${process.argv[3]}/jobs`);
  console.log(JSON.stringify(jobs.jobs.map(job => ({ name: job.name, conclusion: job.conclusion, steps: job.steps.map(step => ({ name: step.name, conclusion: step.conclusion })) }))));
} else throw new Error(`Unknown action: ${action}`);
