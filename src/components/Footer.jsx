export default function Footer(){
return(
<footer>
  <div className='flex justify-evenly bg-gray-900 text-gray-400 py-12 px-6 
border-t border-gray-800'>
    <div>
      <h3 className='text-white font-bold text-lg mb-3'>Biryani Bro&apos;s</h3>
      <p className='text-sm leading-relaxed'>Authentic flavors, royal spices, and traditional dum biryani delivered right to your doorstep.</p>
    </div>

    <div>
      <h4 className='text-white font-semibold text-sm mb-3 justify-center uppercase tracking-wider'>
        Quick Links</h4>
      <ul className='space-y-2 text-sm justify-center'>
        <li><a href='#' className='hover:text-white transition-colors'>Menu</a></li>
        <li><a href='#' className='hover:text-white transition-colors'>Book a Table</a></li>
        <li><a href='#' className='hover:text-white transition-colors'>Privacy Policy</a></li>
      </ul>
    </div>
    <div>
      <h4 className='text-white font-semibold text-sm mb-3 uppercase tracking-wider'>Contact Us</h4>
      <p className='text-sm mb-1'>Kanuru, Vijayawada, AP</p>
      <p className='text-sm mb-1'>Phone: +91 98765 43210</p>
      <p className='text-sm'>Email: support@biryanibros.com</p>
    </div>
  </div>
    <div className='border-t-cyan-200 mx-auto p-6 border-t
     border-gray-900 text-center text-xs text-white bg-gray-900'>
    &copy; {new Date().getFullYear()} Biryani Bro&apos;s. All rights reserved.
  </div>
</footer>
)
}
