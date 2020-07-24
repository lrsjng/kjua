const RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;

const qr_gen = require('qrcode-generator');
qr_gen.stringToBytes = qr_gen.stringToBytesFuncs['UTF-8'];

const min_qrcode = (text, level, min_ver = 1) => {
    min_ver = Math.max(1, min_ver);

    for (let version = min_ver; version <= 40; version += 1) {
        try {
            const qr = qr_gen(version, level);
            qr.addData(text);
            qr.make();
            const module_count = qr.getModuleCount();
            const is_dark = (row, col) => {
                return row >= 0 &&
                    row < module_count &&
                    col >= 0 &&
                    col < module_count &&
                    qr.isDark(row, col);
            };
            return {text, level, version, module_count, is_dark};
        } catch (err) {
            if (!(version < 40 && RE_CODE_LENGTH_OVERFLOW.test(err))) {
                throw new Error(err);
            }
        }
    }
    return null;
};

const quiet_qrcode = (text = '', level = 'L', min_ver = 1, quiet = 0) => {
    const qr = min_qrcode(text, level, min_ver);
    if (qr) {
        const prev_is_dark = qr.is_dark;
        qr.module_count += 2 * quiet;
        qr.is_dark = (row, col) => prev_is_dark(row - quiet, col - quiet);
    }
    return qr;
};

module.exports = quiet_qrcode;
