import React from "react";
import PropTypes from "prop-types";
// import Spinner from '../Spinner';
import "./styles.scss";

const Page = ({ isReady = true, children, excludeContainer = false }) => {
  //   const contentPart = isReady ? children : <Spinner />;
  return (
    <div className="Page">
      {/* {excludeContainer ? contentPart : <Container>{contentPart}</Container>} */}
      {children}
    </div>
  );
};

Page.propTypes = {
  isReady: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.node,
  testHook: PropTypes.string,
};

export default Page;
