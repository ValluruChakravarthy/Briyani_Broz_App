/*export const LoginStructure={
login:{
          title:"Welcome Back..Please login!",
          fields:[
          {name: "email", type: "email", label: "Email", required: true},
           {password: "password", type: "text", label: "Password", required: true}
          ]
           ,
          button:"Sign-In",
          footer:[
                    {text:"Forgot Password",action:"forgotPassword"},
                    {text:"Forgot Password",action:"forgotPassword"}],
          apiAction:"select"
          },

 register:{
          title: "Register for More Features",
          fields: [
          { name: "fullname", type: "text", label: "Full Name", required: true },
          { name: "email", type: "email", label: "Email", required: true },
          { name: "password", type: "password", label: "Password", required: true },
          { name: "confirmpassword", type: "password", label: "Confirm Password", required: true }
          ],
          button: "Register",
          footer: [
          { text: "login", action: "login" },
          { text: "Forgot Password", action: "forgotPassword" }
          ],
          apiAction: "insert"
  },

  forgotPassword: {
          title: "Enter your Email to Reset",
          fields: [
          { name: "email", type: "email", label: "Email", required: true }
          ],
          button: "Reset Password",
          footer: [
          { text: "login", action: "login" },
          { text: "Register", action: "register" }
          ],
          apiAction: "update"
  }
};

export default LoginStructure
*/

//I thought the above initially
// LoginStructure.jsx
export const LoginStructure = [
  { name: "email", type: "email", placeholder: "Enter your email", className: "border border-slate-300 p-2 rounded" },
  { name: "password", type: "password", placeholder: "Enter your password", className: "border border-slate-300 p-2 rounded" },
  { name: "fullname", type: "text", placeholder: "Enter your full name", className: "border border-slate-300 p-2 rounded" },
  { name: "confirmpassword", type: "password", placeholder: "Confirm your password", className: "border border-slate-300 p-2 rounded" }
];

export const auth_modes = {
  login: {
    title: "Welcome Back..Please login!",
    fields: ["email", "password"],
    button: "Sign-In",
    footer: ["Forgot Password", "Register"]
  },
  register: {
    title: "Register for More Features",
    fields: ["fullname", "email", "password", "confirmpassword"],
    button: "Register",
    footer: ["login", "Forgot Password"]
  },
  forgotPassword: {
    title: "Enter your Email to Reset",
    fields: ["email"],
    button: "Reset Password",
    footer: ["login", "Register"]
  }
};

export default LoginStructure;