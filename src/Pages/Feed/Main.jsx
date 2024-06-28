import { useEffect, useState } from "react";
import Form from "../../Components/Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../Components/Loader";
import Post from "../../Components/Posts";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    //abone olunacak koleksiyonun referansini aliyoruz
    const ref = collection(db, "tweets");

    // abonelik ayarlari siralama ekliyoruz
    const q = query(ref, orderBy("createAt", "desc"));
    // console.log(q);

    //koleksiyona abone oluyoruz
    const unsub = onSnapshot(q, (snapshot) => {
      // tweetlerin gecici olarak tutulacagi diziyi tanimla
      const temp = [];

      //dokumanlarin icindeki veriye ulasip gecici diziye aktariyoruz
      // console.log(snapshot.docs);
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));
      // console.log(temp);

      //state'i guncelliyoruz
      setTweets(temp);
    });

    // bilesen ekrandan giderse aboneligi durdur
    return () => unsub();
  }, []);

  // console.log(tweets);

  return (
    <main className="border border-zinc-600 overflow-y-auto">
      <header className="border-b border-zinc-600 p-4 font-bold">Home</header>
      <Form user={user} />

      {!tweets ? (
        <div className="flex justify-center my-24 scale-[1.5]">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;
