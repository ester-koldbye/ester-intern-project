const isCi = Boolean(process.env.CI);

if (!isCi) {
    const husky = (await import("husky")).default;
    husky();
} else {
    // eslint-disable-next-line no-console
    console.log(
        "Skipped configuring Husky Git hooks as process is running in a Continuous Integration environment.",
    );
}
