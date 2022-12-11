import './searchbar.css';
import { FaSearch } from 'react-icons/fa';
import React from 'react';

const Searchbar: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}> = (props) => {
  return (
    <div className="searchbar">
      <input
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      ></input>
      <button className="searchbar-icon hover-shadow" onClick={props.onClick}>
        <FaSearch size={15} color="var(--color-bg)" />
      </button>
    </div>
  );
};

export default Searchbar;
