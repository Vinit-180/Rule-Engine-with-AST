import React from 'react'

const Home = () => {
  return (
    <div className='bg-gray-700 text-white h-[100vh]'>
      <div className='m-auto py-10'>
      <h1 className='text-5xl text-center '>Welcome to Rule Engine</h1>
      <div className='my-5 flex justify-center'>
        <section className="features-section">
        <p className='text-2xl my-2'>There are few options in Navbar you can go there and check the functionality</p>
                <h2 className='text-5xl font-bold'>Features</h2>
                <div className="feature my-3 ">
                    <h3 className='text-3xl '>Create Rules</h3>
                    <p>
                        Just enter your string in a simple format and It will be convert it into Rule
                    </p>
                </div>
                <div className="feature my-3 ">
                    <h3 className='text-3xl '>Evaluate Rules</h3>
                    <p>
                        Easily evaluate rule.
                        Just enter your rule in a simple format and watch them evaluating seamlessly.
                    </p>
                </div>
                <div className="feature my-3 ">
                    <h3 className='text-3xl '>Combine Rules</h3>
                    <p>
                        Easily combine multiple rules using logical operators such as AND, OR.
                        Just enter your rules in a simple format and watch them combine seamlessly.
                    </p>
                </div>
                <div className="feature my-3">
                <h3 className='text-3xl '>Get All Rules</h3>
                    <p>
                        Get all the rules.
                    </p>
                </div>
                <div className="feature my-3">
                <h3 className='text-3xl '>Manage Rule </h3>
                    <p>
                        Manage your rules dynamically by adding, editing, or removing rules
                        as needed. Our interface allows for quick adjustments without hassle.
                    </p>
                </div>

                
            </section>

      </div>
      </div>
    </div>
  )
}

export default Home
