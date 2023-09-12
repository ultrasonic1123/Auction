import React from "react";
import { useState } from "react";
import styles from "./categories.module.css";
import { useNavigate } from "react-router-dom";
const CategoriesList = () => {
  const navigator = useNavigate();
  const categogies = [
    {
      name: "Furnitures",
      image:
        "https://static.asianpaints.com/content/dam/asian_paints/blog/wood/benefits-of-wooden-furniture/image-2-asian-paints-m.jpeg",
    },
    {
      name: "Sports",
      image:
        "https://ieltsxuanphi.edu.vn/wp-content/uploads/2021/06/sports-New-Brunswick.jpg",
    },
    {
      name: "jewelries",
      image:
        "https://bnsec.bluenile.com/bluenile/is/image/bluenile/2023q2-jsp-hero?$alloy_default$&wid=850&hei=431&crop=609%2C922%2C2808%2C1424&fmt=pjpeg",
    },
    {
      name: "Books",
      image:
        "https://wordsrated.com/wp-content/uploads/2022/02/Number-of-Books-Published-Per-Year.jpg",
    },
    {
      name: "Accommodations",
      image:
        "https://www.qs.com/wp-content/uploads/2019/12/student-accommodation.jpg",
    },
    {
      name: "Cars",
      image:
        "https://assets.entrepreneur.com/content/3x2/2000/1661888151-DAL500017.jpg",
    },
  ];
  const CategoryItem = ({ item }) => {
    return (
      <div
        onClick={() =>
          navigator(`/category?type=${item.name.toLowerCase()}`, {
            state: { categoryType: item.name.toLowerCase() },
          })
        }
        className={styles["item-category"]}
        style={{
          margin: "5px",
          width: "20%",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            backgroundColor: "rgb(240, 240, 240)",
            padding: "10px 0px",
            fontFamily: "Nunito",
          }}
        >
          {item.name}
        </div>
        <div
          key={item.name.toString()}
          style={{
            width: "100%",
            height: "100px",
            background: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderBottomLeftRadius: "3px",
            borderBottomRightRadius: "3px",
          }}
        ></div>
      </div>
    );
  };
  return (
    <div style={{ display: "flex" }}>
      {categogies.map((item) => (
        <CategoryItem item={item} key={item.name} />
      ))}
    </div>
  );
};

export default CategoriesList;
