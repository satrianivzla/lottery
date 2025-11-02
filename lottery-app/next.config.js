
/** @type {import('next').NextConfig} */
const nextConfig = {
  //
  // NOTE:
  //   - The `dev` script in `package.json` should not have `--turbo` flag.
  //   - The `experimental.turbo` option is not supported in `next.config.js`.
  //
  // The only way to disable Turbopack is to ensure that the `dev` script in `package.json`
  // does not include the `--turbo` flag.
  //
  // This file is being created to make it clear that Turbopack is not being configured,
  // and to provide a place for other Next.js configuration in the future.
  //
};

module.exports = nextConfig;
