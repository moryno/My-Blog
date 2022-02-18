import "./header.css"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">Blog</span>
      </div>
      <img 
         className="headerImg"
          src="https://images.unsplash.com/photo-1456324463128-7ff6903988d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8MjMyODEyfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60" 
          alt="header"
          />
    </div>
  )
}
