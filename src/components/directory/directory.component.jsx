import CategoryItem from "../category-item/category-item.component";
import "./directory.style.scss";

const Directory = ({ categories }) => (
  <div className="directory-container">
    {categories.map((category) => (
      <CategoryItem category={category} key={category.id} />
    ))}
  </div>
);

export default Directory;
