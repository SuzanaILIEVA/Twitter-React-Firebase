const NewsCard = ({ news }) => {
  return (
    <div>
      <div className="p-2">
        <p className=" p-2">{news.title}</p>

        <div className="flex justify-between gap-2 p-4  border border-gray-500 cursor-pointer hover:scale-[0.98] rounded-lg">
          <div className="flex flex-col max-w-[60%]">
            <p>{news.name}</p>
            <p>{news.desc}</p>
          </div>
          <div>
            <img className="w-32 h-24 rounded-lg" src={news.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
