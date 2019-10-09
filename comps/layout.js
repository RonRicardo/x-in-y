const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
  textAlign: "center",
  width: "500px",
  backgroundImage: "linear-gradient(white, white, white, white, yellow, red)"
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100vh"
};

const Layout = props => (
  <div className="flexContainer" style={containerStyle}>
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
    ></link>
    <div style={layoutStyle}>{props.children}</div>
  </div>
);

export default Layout;
