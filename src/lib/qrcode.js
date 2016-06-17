const RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;

const vendorCode = (() => {
    // @include "vendor/qrcode.js"
    // @include "vendor/qrcode_UTF8.js"
    return qrcode; // eslint-disable-line no-undef
})();

const minCode = (text, level, minVersion = 1) => {
    minVersion = Math.max(1, minVersion);

    for (let version = minVersion; version <= 40; version += 1) {
        try {
            const qr = vendorCode(version, level);
            qr.addData(text);
            qr.make();
            const moduleCount = qr.getModuleCount();
            const isDark = (row, col) => {
                return row >= 0 &&
                    row < moduleCount &&
                    col >= 0 &&
                    col < moduleCount &&
                    qr.isDark(row, col);
            };
            return {text, level, version, moduleCount, isDark};
        } catch (err) {
            if (!RE_CODE_LENGTH_OVERFLOW.test(err.message)) {
                throw err;
            }
        }
    }
    return null;
};

const quietCode = (text = '', level = 'L', minVersion = 1, quiet = 0) => {
    const qr = minCode(text, level, minVersion);
    if (qr) {
        const prevIsDark = qr.isDark;
        qr.moduleCount += 2 * quiet;
        qr.isDark = (row, col) => prevIsDark(row - quiet, col - quiet);
    }
    return qr;
};

module.exports = quietCode;
