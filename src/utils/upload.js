/*
 * Herhangi bir medya içeriğini (foto,video,ses,dosya,belge)
 veritbanlarına doğrudan kaydetmeyiz. Bu sorunu çözüm olarak medya 
 içeriklerini sadece medya verisi depolaması için tasarlanmış olan
yapılarda depolayip medyaya erişmek için kullanılan url adreslerini
 veritabanında saklarırız.(orn: cloudinary,aws bucket gibi depolama alanlari)
 */

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

 /**bu fonksiyondan beklentimiz dosyayi alip firebase storage'a yukleyip
  * ardindan url'ini return etmesi 
  */
const upload = async (file) => {
    //1. dosya resim degilse veya dosya yoksa fonksiyonu durdur
    if(!file?.type.startsWith("image") || !file){
        return null

    }

    //2.dosyanin yuklenecegi konumun referansini al
   const imageRef = ref(storage, v4() + file.name)

    //3 referansini olusturdugumuz konuma dosyayi yukle
   await uploadBytes(imageRef,file)

    //4. yuklenen dosyanin url'ini al ve return et 
    //  console.log( await getDownloadURL(imageRef))
     return  await getDownloadURL(imageRef)


};


export default upload;
