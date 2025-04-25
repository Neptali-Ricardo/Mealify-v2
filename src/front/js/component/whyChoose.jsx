import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WhyChoose = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/menuCreator');
    };

    return (
        <section className="why-choose container text-center" id='WhyChoose'>
            <header className="why-choose__header">
                <h2 className="why-choose__title">Why Choose <strong>Mealify?</strong></h2>
                <p className="why-choose__description">Mealify is your AI-powered personal meal planning assistant, designed to help you eat better without the hassle. Here are the main benefits:</p>
            </header>
            <div className="why-choose__benefits">
                <article className="why-choose__benefit why-choose__benefit--personalized row">
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/personalized_qqi5qa.png" alt="Personalized meal planning" />
                    </div>
                    <div className="why-choose__content why-choose__content--personalized col-sm-12 col-md-6 col-lg-6">
                        <h3 className="why-choose__subtitle">Discover <strong>personalized recipes</strong> tailored to your preferences</h3>
                        <p className="why-choose__text">Find delicious recipes customized to your diet, restrictions, and health goals.</p>
                    </div>
                </article>
                <article className="why-choose__benefit why-choose__benefit--weekly-meals row">
                    <div className="why-choose__content why-choose__content--weekly-meals col-sm-12 col-md-6 col-lg-6">
                        <h3 className="why-choose__subtitle">Easily plan <strong>weekly meals</strong> with AI assistance</h3>
                        <p className="why-choose__text">Let our smart technology generate weekly menus based on your preferences and needs.</p>
                    </div>
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/list_bkky0h.png" alt="Weekly meal planning" />
                    </div>
                </article>
                <article className="why-choose__benefit why-choose__benefit--shopping-lists row com-sm-12">
                    <div className="why-choose__image col-sm-12 col-md-6 col-lg-6">
                        <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1738006336/basket_bbqf0a.png" alt="Shopping list" />
                    </div>
                    <div className="why-choose__content why-choose__content--shopping-lists col-sm-12 col-md-6 col-lg-6">
                        <h3 className="why-choose__subtitle">Create optimized <strong>shopping lists</strong> to save time and money</h3>
                        <p className="why-choose__text">With Mealify, you'll get automatic shopping lists so you can save both time and money at the grocery store.</p>
                    </div>
                </article>
            </div>
            <div className="why-choose__footer">
                <h2 className="why-choose__title--footer">Ready to Transform  <strong>Your Meal Planning?</strong></h2>
                <p className="why-choose__description">Join Mealify today and start enjoying healthy, easy-to-plan weekly menus. Begin your journey to smarter, more delicious eating!</p>
            </div>
            <button href="#" onClick={handleClick} className="button button--medium">
                Start Your Journey Now
                <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
            </button>
        </section>
    );
};