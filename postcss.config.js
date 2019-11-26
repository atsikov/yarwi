const plugins = [
    require("postcss-import"),
    require("precss"),
    require("autoprefixer"),
    require("postcss-calc"),
];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        require("cssnano"),
    );
}

module.exports = { plugins };
