export const FormStructure=
 [
  {
      name: 'CustomerName', 
      type: "text", 
      className: "border rounded-lg px-4 py-2",
      component: "input",
      label: 'Name',
      required: true,
      value: "",
      placeholder: "Write your full name..."   
 }, {
      name: 'Noofpeople', 
      type: "number", 
      className: "border rounded-lg px-4 py-2",
      component: "input",
      label: 'Number of Guests',
      required: true,
      value: "",
      placeholder: "How many are attenging?"
 },{
      name: 'PhoneNumber', 
      type: "number", 
      className: "border rounded-lg px-4 py-2",
      component: "input",
      label: 'Number of Guests',
      required: true,
      defaultValue: "",
      value: "",
      placeholder: "Your Good Phone Number please?"
 },{
      name: 'Email', 
      type: "email", 
      className: "border rounded-lg px-4 py-2",
      component: "dropdown",
      label: 'Gender',
      required: true,
      placeholder: "Enter your Email please.."
 }];
