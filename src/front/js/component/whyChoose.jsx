import React from 'react';

export const WhyChoose = () => {

    return (
        <section className="why-choose container text-center mt-5 mb-5">
            <div className="why-choose__header mt-5 mb-5">
                <h2 className="why-choose__title">Why Choose Mealify?</h2>
                <p className="why-choose__description">Mealify is your AI-powered personal meal planning assistant, designed to help you eat better without the hassle. <br /> Here are the main benefits:</p>
            </div>
            <div className="why-choose__benefits">
                <div className="why-choose__benefit why-choose__benefit--personalized row ">
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6 ">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/personalized_qqi5qa.png" alt="Planificación de comidas" />
                    </div>
                    <div className="why-choose__content--personalized col-sm-12 col-md-6 col-lg-6 ">
                        <h3 className="why-choose__subtitle">Discover <strong>personalized recipes</strong> tailored to your preferences</h3>
                        <p className="why-choose__text">Find delicious recipes customized to your diet, restrictions, and health goals.</p>
                    </div>
                </div>
                <div className="why-choose__benefit why-choose__benefit--weekly-meals row">
                    <div className="why-choose__content--weekly-meals col-sm-12 col-md-6 col-lg-6 ">
                        <h3 className="why-choose__subtitle">Easily plan <strong>weekly meals</strong> with AI assistance</h3>
                        <p className="why-choose__text">Let our smart technology generate weekly menus based on your preferences and needs.</p>
                    </div>
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6 ">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/list_bkky0h.png" alt="Planificación de comidas" />
                    </div>
                </div>
                <div className="why-choose__benefit why-choose__benefit--shopping-lists row com-sm-12">
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6 ">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/basket_bbqf0a.png" alt="Planificación de comidas" />
                    </div>
                    <div className="why-choose__content--shopping-lists col-sm-12 col-md-6 col-lg-6 ">
                        <h3 className="why-choose__subtitle">Create optimized <strong>shopping lists</strong> to save time and money</h3>
                        <p className="why-choose__text">With Mealify, you'll get automatic shopping lists so you can save both time and money at the grocery store.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};