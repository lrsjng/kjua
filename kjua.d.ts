declare function kjua(opts: kjua.KjuaOptions): any;

declare namespace kjua {
    interface KjuaOptions {
        /**
         * Render the image as either SVG, canvas or PNG-image
         */
        render?: 'image' | 'svg' | 'canvas';

        /**
         * render pixel-perfect lines
         */
        crisp?: boolean;

        /**
         * minimum version: 1..40
         */
        minVersion?: number;

        /**
         * error correction level: 'L', 'M', 'Q' or 'H'
         */
        ecLevel?: 'L' | 'M' | 'Q' | 'H';

        /**
         * size in pixel
         */
        size?: number;

        /**
         * pixel-ratio, null for devicePixelRatio
         */
        ratio?: number | null;

        /**
         * code color
         */
        fill?: string;

        /**
         * background color
         */
        back?: string;

        /**
         * content
         */
        text?: string;

        /**
         * roundend corners in pc: 0..100
         */
        rounded?: number;

        /**
         * quiet zone in modules
         */
        quiet?: number;

        /**
         * modes: 'plain', 'label' or 'image'
         */
        mode?: 'plain' | 'label' | 'image';

        /**
         * label/image size and pos in pc: 0..100
         */
        mSize?: number;
        mPosX?: number;
        mPosY?: number;

        /**
         * label
         */
        label?: string;
        fontname?: string;
        fontcolor?: string;
        fontoutline?: boolean;

        /**
         * image element
         */
        image?: null | HTMLImageElement | string;

        /**
         * draw the image as part of the code
         */
        imageAsCode?: boolean;
    }
}

export = kjua;
