type videoExtension = 'mp4' | 'avi' | 'mkv' | 'wmv' | 'flv' | 'mov' | '3gp' | 'mpeg' | 'webm' | 'ogg' | 'm4v' | 'ts' | 'rm' | 'divx' | 'asf';
export interface chooseVideoOptions extends UniNamespace.ChooseVideoOptions {
    /**
     *
     *
     * 给视频后缀添加上类型
     *
     * @public
     */
    extension: (videoExtension)[];
}
export declare class ChooseVideo {
    done(): void;
}
export {};
