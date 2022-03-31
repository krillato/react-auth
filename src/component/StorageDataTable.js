import React,{ Component } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";
import 'filepond/dist/filepond.min.css';
// FilePond Register plugin
import FilePondImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondImagePreview);

export const  StorageDataTable =()=>{
    return(
        <div>
            StorageDataTable
        </div>
    );
}