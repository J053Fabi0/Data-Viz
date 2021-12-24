import styled from "@emotion/styled";
import React, { useState, forwardRef } from "react";
import { Dropdown, FormControl, DropdownButton } from "react-bootstrap";

const CustomToggle = forwardRef(({ children, onClick, title }, ref) => (
  <DropdownButton
    ref={ref}
    title={title}
    id="dropdown-basic-button"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </DropdownButton>
));

const CustomMenu = forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <FormControl
        autoFocus
        value={searchInput}
        placeholder="Buscar"
        className="mx-3 my-2 w-auto"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child) => !searchInput || child.props.children.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
        )}
      </ul>
    </div>
  );
});

export default function DropDownSearch({ items, selectedItemIndex = 0, onSelect, title = "Título" }) {
  const itemsToShow = items.map((v, i) => {
    return (
      <Dropdown.Item eventKey={i} key={`${v}${i}`} active={selectedItemIndex === i}>
        {v}
      </Dropdown.Item>
    );
  });

  const Menu = styled(({ children, className }) => (
    <Dropdown.Menu as={CustomMenu} className={className}>
      {children}
    </Dropdown.Menu>
  ))({
    maxHeight: "70vh",
    overflowY: "auto",
  });

  return (
    <Dropdown onSelect={onSelect} className="dropdown-search mt-2">
      <h6 className="m-0 mb-1">{title}</h6>
      <Dropdown.Toggle as={CustomToggle} title={items[selectedItemIndex]} />

      <Menu>{itemsToShow}</Menu>
    </Dropdown>
  );
}
