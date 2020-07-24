import React, { Component } from 'react';
import './styleNavigation.css'
import CreateGroup from '../dialogs/CreateGroup';
import {Add} from '@material-ui/icons'
import {IconButton, Button} from '@material-ui/core'

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            groups: [],
        }
        
        //props für gruppen etc. Todo
    }

/*     navSlide(){
        const burger = document.querySelector('.burger');
        const nav = document.querySelector(".nav-links");
        const navLinks = document.querySelector("nav-links li");

        burger.addEventListener('click',() =>{
            nav.classList.toggle('nav-active');
        });

        navLinks.forEach((link,index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index /7}`;

        })
    } */

    addGroup = () =>{
        const {}            
        }

    }

    render(){
        return(
            <div>
                <div>
                    <IconButton onClick = {(e) => this.addGroup()}>
                        <Add/>
                    </IconButton>
                </div>
                <div class = "nav-links">
                    <div>
                        Gruppe1
                    </div>
                    <div>
                        Gruppe2
                    </div>
                    <div>
                        Gruppe3
                    </div>
                </div>
            </div>
/*             <nav
            //hier wahrscheinlich ohne Math.round
            style = {{width: Math.round(window.innerHeight *0.3),}}>
                <div
                style= {{
                    display: "flex",
                    justifyContent: "space-around",
                    alignitems: "center",
                    backgroundColor: "lightblue",
                    fontFamily: "sans-serif",
                }}>
                    <h1>Navigation</h1>
                </div>
                <ul class = "nav-links">
                    <li
                        style = {{listStyle:"none"}}
                    >
                        <h2
                        style = {{
                            backgroundColor: "blue",
                            textDecoration : "none",
                            fontSize: "20px"
                        }}
                        >Gruppen</h2>
                        <li>
                            <h2>ShoppingListen</h2>
                        </li>
                    </li>
                </ul>
            </nav> */
        )
    };
}

export default Navigation;