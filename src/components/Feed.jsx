import { app } from "../firebase";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "./Post";

// 從 Firestore 存取資料渲染（i.e. 非 client 組件）
const Feed = async () => {
  const db = getFirestore(app); // 存取 Firestore
  // 將從 db 'posts' collection 中存取的資料儲存成集合
  // 依 timestamp 降冪排序
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  // 存取多筆文件內容
  const querySnapshot = await getDocs(q);

  let data = []; // 創建 Array 使文件有序排列
  // forEach() method 迭代將資料加入 array
  querySnapshot.forEach((doc) => {
    // 每筆資料都是 Object 內含不同 key
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log(data);
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
};

export default Feed;
