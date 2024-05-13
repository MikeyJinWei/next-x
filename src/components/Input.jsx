"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";

import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";

const Input = () => {
  const { data: session } = useSession();
  // 供 input:file 引用的 ref
  const imgPickRef = useRef(null);
  // 狀態儲存緩存的圖片
  const [selectedFile, setSelectedFile] = useState(null);
  // 緩存圖片的 URL 以渲染預覽圖
  const [imgFileUrl, setImgFileUrl] = useState(null);
  // console.log(imgFileUrl);
  // 管理照片上傳狀態
  const [imgFileUploading, setImgFileUploading] = useState(false);
  // 管理 textarea 狀態
  const [text, setText] = useState("");
  // 管理發文 (Post) 加載狀態
  const [postLoading, setPostLoading] = useState(false);
  // 創建 URL 渲染預覽圖、準備上傳至 firebase storage
  const addImgToPost = (e) => {
    const file = e.target.files[0];
    // 確認 file 的 truthy, falsy
    if (file) {
      setSelectedFile(file);
      setImgFileUrl(URL.createObjectURL(file));
      // console.log(file);
    }
  };
  //重置發文欄位
  const resetPost = (e) => {
    setSelectedFile(null);
    setImgFileUrl(null);
  };

  // 緩存到圖片時執行上傳的 function
  useEffect(() => {
    if (selectedFile) {
      uploadImgToStorage();
    }
  }, [selectedFile]);

  // 上傳圖片至 firebase storage: https://firebase.google.com/docs/storage/web/start?hl=en&authuser=0
  const uploadImgToStorage = () => {
    setImgFileUploading(true);
    // 創建儲存空間
    const storage = getStorage(app);
    // 創建上傳檔案的名稱
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    // 創建 ref 允許檔案上傳／下載
    const storageRef = ref(storage, fileName);
    // 上傳圖片檔至 firebase storage
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 存取上傳進度
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "$ done");
      },
      // 發生錯誤時
      (error) => {
        console.log(error);
        // 關閉上傳狀態
        setImgFileUploading(false);
        // 清空圖片檔緩存／URL
        setImgFileUrl(null);
        setSelectedFile(null);
      },
      // 成功上傳就存取圖片檔 URL
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
          setImgFileUploading(false); // 關閉上傳狀態
        });
      }
    );
  };

  // 提交圖片文字至 Firebase firestore
  const db = getFirestore(app); // 初始化 Firestore db
  const handleSubmit = async () => {
    setPostLoading(true);

    // 創建 posts collection
    const docsRef = await addDoc(collection(db, "posts"), {
      // 每筆 post 帶有的 key
      userId: session.user.userId,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      postImg: imgFileUrl,
    });

    setPostLoading(false);
    setText("");
    setImgFileUrl(null);
    setSelectedFile(null);
    location.reload(); // 重整頁面即時更新資料
  };

  if (!session) return null;
  return (
    <div className="w-full flex space-x-3 p-3 border-b border-neutral-200">
      <img
        src={session.user.image}
        alt="user-img"
        className="h-12 w-12 rounded-full cursor-pointer hover:brightness-95"
      />

      <div className="w-full divide-y divide-neutral-200">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="What's happening"
          className="w-full min-h-[50px] text-neutral-700 tracking-wide border-none outline-none"
        ></textarea>
        {selectedFile && (
          <img
            src={imgFileUrl}
            alt="post-img"
            // 依照片上傳進度條件渲染動畫 className
            className={`w-full object-cover cursor-pointer
              ${imgFileUploading ? "animate-pulse" : ""}
            `}
          />
        )}

        <div className="flex items-center justify-between pt-2.5">
          {/* 使用 click() method 觸發對 imgPickRef 點擊事件 */}
          <FaImage
            onClick={() => imgPickRef.current.click()}
            className="w-10 h-10 p-2 text-sky-600 rounded-xl hover:bg-sky-100 cursor-pointer"
          />
          {/* 使上傳時僅篩選圖片檔 */}
          <input
            onChange={addImgToPost}
            type="file"
            ref={imgPickRef}
            accept="image/*"
            hidden
          />
          <div className="flex gap-3">
            <button
              onClick={resetPost}
              className="px-4 py-1.5 rounded-full font-medium bg-neutral-200 hover:brightness-95 disabled:opacity-50 shadow-md"
            >
              Cancel
            </button>
            <button
              // disabled 當 textarea 為空值（trim() method 去除誤打的空白鍵）
              // 或發文正在加載
              // 或圖片正在上傳
              disabled={text.trim() === "" || postLoading || imgFileUploading}
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-full font-medium text-white bg-indigo-400 hover:brightness-95 disabled:opacity-50 shadow-md"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
