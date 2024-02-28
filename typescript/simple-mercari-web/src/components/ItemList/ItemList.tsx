import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  category: string;
  image_name: string;
};

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}
async function getImage(imageName: string): Promise<string> {
  const endpoint = `${server}/image/${imageName}`;
  
  try {
      const response = await fetch(endpoint);
      
      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      console.log(imageUrl);
      return imageUrl;
  } catch (error) {
      console.error('Error fetching image:', error);
      throw error; // 例外を再スローして呼び出し元で処理できるようにする
  }
}

export const ItemList: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const [items, setItems] = useState<Item[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${server}/items`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      const data = await response.json();
      console.log('GET success:', data);
      const fetchedItems = data.items;
      setItems(fetchedItems);
      
      // Fetch images for each item individually
      const urls = [];
      for (const item of fetchedItems) {
        const imageUrl = await getImage(item.image_name);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      onLoadCompleted && onLoadCompleted();
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };



  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={item.id} className='ItemList'>
            <img src={imageUrls[index]} />

            <p>
              <span>Name: {item.name}</span>
              <br />
              <span>Category: {item.category}</span>
            </p>
          </div>
        );
      })}
    </div>
  )
};
