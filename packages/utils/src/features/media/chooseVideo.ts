/*
 * @Author: @memo28.repo
 * @Date: 2023-12-16 12:55:09
 * @LastEditTime: 2023-12-16 15:58:21
 * @Description: 增强 ChooseVideo
 * @FilePath: /uniRepo/packages/utils/src/features/media/chooseVideo.ts
 */

type videoExtension = 'mp4' | 'avi' | 'mkv' | 'wmv' | 'flv' | 'mov' | '3gp' | 'mpeg' | 'webm' | 'ogg' | 'm4v' | 'ts' | 'rm' | 'divx' | 'asf';


export interface chooseVideoOptions extends UniNamespace.ChooseVideoOptions {
    /**
     * 
     * 
     * 给视频后缀添加上类型
     * 
     * @public
     */
    extension: (videoExtension)[]
}

export class ChooseVideo {
    done() {

    }
}