import * as React from 'react';
import axios from 'axios';

import '../styles/AddWorker.css';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';
import {useState, useRef, useCallback, useEffect} from 'react'
import { MDBDataTableV5 } from 'mdbreact';

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "../styles/file-upload.styles";
import { useHistory } from 'react-router';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Перетащить в любое место файлы или</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Выбрать файлы </span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;

export function CreateLearningEventPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [date, setDate] = useState("");
  const [score, setScore] = useState(0);
  const [columns, setColumns] = useState(
    [
        {
          label: 'Имя',
          field: 'name',
          sort: 'asc',
          width: 75
        },
        {
          label: 'Подразделение',
          field: 'department',
          sort: 'asc',
          width: 135
        },
        {
          label: 'Должность',
          field: 'post',
          sort: 'asc',
          width: 135
        },
        {
          label: 'Почта',
          field: 'email',
          sort: 'asc',
          width: 300
        },
        {
          label: '',
          sort: 'disabled',
          field: 'actionAdd'
        },
        {
          label: '',
          sort: 'disabled',
          field: 'actionDelete'
        }
      ])

    const [rows, setRows] = useState([])
    const [selected, setSelected] = useState([])
    let addRef = useRef();
    const history = useHistory();

const handleName = (evt) => {
    setName(evt.target.value)
}

const handleDate = (evt) => {
  setDate(evt.target.value)
}

const handleDesc = (evt) => {
  setDescription(evt.target.value)
}

const handleScore = (evt) => {
  setScore(evt.target.value)
}


const updateUploadedFiles = (files) => {
  setSelectedFiles(files)
  console.log(files)
}

async function sendEvent() {
  const b = JSON.stringify({
    name: name,
    description: description,
    plannedDate: date,
    maxScore: parseInt(score, 10),
    workers: selected
  })
  var ans = await fetch('https://localhost:8001/Learning/CreateLearningEvent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: b
  })
  history.push('/leraning')  
}

const fetchdata = useCallback(async () => {
  const result = await fetch('https://localhost:5001/api/Workers/All');
  const workers = await result.json();
  workers.forEach(element => {
    element["checked"] = true
  })
  setRows(workers)
}, [])

useEffect(() => {
  fetchdata()
}, [fetchdata])

function deleteRow(id, index) {
  const copy = [...rows]
  var ans = copy.splice(index, 1)
  setRows(copy)
  setSelected(element => [...element, {"id": id}])
}


  return(rows.forEach((e, index) => 
  e["actionDelete"]=<a className="btn btn-light" role="button" 
  onClick={() => deleteRow(e.id, index)}>Добавить</a>),
    <div id="createLP">
      <FileUpload multiple updateFilesCb={updateUploadedFiles}/>
      <div className="addWorkerForm">
        <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="nam" name="name" className="form-control cform-control" onChange={(e) => handleName(e)} placeholder="Название"/>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="nam" name="phoneNumber" className="form-control cform-control1" onChange={(e) => handleDesc(e)} placeholder="Описание"/>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="nae" name="phoneNumber" className="form-control cform-control" onChange={(e) => handleDate(e)} placeholder="Дата"/>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="formLabel">
            <input type="text" id="nae" name="phoneNumber" className="form-control cform-control" onChange={(e) => handleScore(e)} placeholder="Максимальный бал"/>
          </label>
        </div>

        <MDBDataTableV5
            id="WorkersAddTable"
            data = {{columns: columns, rows: rows}}
            autoWidth
            striped
            bordered={false}
            btn
            searchTop
            searchBottom={false}
            hover
            entriesOptions={[5, 10, 25]}
            entries={10}
            pagesAmount={4}
            />
        <input type="submit" className="btn btn-primary cbtn" value="Добавить" onClick={() => sendEvent()}/>
      </div>
    </div>
  );
}


