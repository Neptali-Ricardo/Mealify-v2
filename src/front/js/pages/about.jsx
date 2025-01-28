import React from 'react';

export const About = () => {

    return (
        <section className="about container text-center mt-5 mb-5" id='WhyChoose'>
            <div className="about__header mt-5 mb-5">
                <h2 className="about__title">About us!</h2>
                <p className="about__description">At Mealify, we believe that the key to creating innovative solutions lies in the people behind them. Our team combines experience, creativity, and technical expertise to develop tools that truly make a difference in our users' lives.
Each member brings a unique perspective, from visual design to advanced software development, enabling us to build digital experiences that are both functional and visually appealing. We are driven by continuous learning, collaboration, and the desire to exceed expectations.
Meet the people behind Mealify.</p>
            </div>
            <div className="about__benefits">
                <div className="about__member about__member--one row ">
                    <div className="about__image col-sm-12 col-md-6 col-lg-6 ">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738062992/about-neptali-castejon_otc3s6.png" alt="Planificación de comidas" />
                    </div>
                    <div className="about__content--member col-sm-12 col-md-6 col-lg-6 ">
                        <h3 className="about__subtitle">From Illustrator to <strong>Full Stack Developer:</strong> Merging Creativity
                        and Technology</h3>
                        <h4>Neptali Castejón</h4>
                        <p className="about__text">My career began in graphic design, where I transformed ideas into impactful visual experiences. Over time, my curiosity about technology led me to explore web development, combining creativity with programming to build comprehensive digital solutions.
As a full stack developer and specialist in technologies like HTML, CSS, JavaScript, React, Python, and SQL, I have consolidated my previous experience in graphic design to create functional and visually appealing digital solutions.</p>
                    </div>
                </div>
                <div className="about__member about__member--two row">
                    <div className="about__content--member col-sm-12 col-md-6 col-lg-6 ">
                        <h3 className="about__subtitle">Building Solutions <strong>from the Ground Up</strong></h3>
                        <h4>Jose Antonio Llorens</h4>
                        <p className="about__text">Currently, I have worked on projects in WordPress and have handled technologies like Django and Laravel in personal projects. I also have experience in process programming and operations in databases (PostgreSQL, MySQL, SQLite, MongoDB) using Java.
I have worked with Android Studio, interface design with SWING, and other frameworks such as Django, HTML, and CSS. My approach combines application development with a solid understanding of databases and backend architecture, creating efficient and functional systems.</p>
                    </div>
                    <div className="about__image col-sm-12 col-md-6 col-lg-6 ">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/list_bkky0h.png" alt="Planificación de comidas" />
                    </div>
                </div>
            </div>
        </section>
    );
};