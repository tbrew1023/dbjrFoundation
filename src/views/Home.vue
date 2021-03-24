<script>
export default {
  name: 'Home',
  data() {
    return {
      enter: false,
      waveOffset: "120vw",
      waveLeft: true,
      options: {
        normalScrollElements: '.test-container, .modal-active, .modal-inactive, .more-work-grid, .more-work-container, .modal-images',
        loopHorizontal: false,
        scrollingSpeed: 1500,
        slidesNavigation: false,
        controlArrows: false,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        navigationTooltips: ['Home','About', 'Donate', 'Resources','Contact'],
        showActiveTooltip: true,
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)', //swoopy
        anchors: ['home','about', 'donate', 'resources','contact'],
        onLeave: (origin, destination, direction) => {
          this.handleLeave(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          this.handleSlideLeave(origin, destination, direction);
        }
      },
      triggerUp: false,
      triggerDown: false,
      fix: false,
      activeSection: 0,
      activeSlide: 1,
      hover: false,
      currentExtra: '',
      currentPreview: '',
      currentProjectText: '',
      currentProjectTitle: '',
      scrollOverflow: false,
      context: 0,
      images: [
        'https://earthsky.org/upl/2020/06/ocean-apr27-2020-Cidy-Chai-North-Pacific-sq.jpeg',
        'https://images.theconversation.com/files/295442/original/file-20191003-52796-1763ajl.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip',
        'https://upload.wikimedia.org/wikipedia/commons/e/e0/Clouds_over_the_Atlantic_Ocean.jpg'
      ]
    }
  },
  props: {
    dataRef: Object
  },
  components: {

  },
  created() {

  },
  mounted() {
    this.hideNav = false; //hide nav on landing page?
    //var i = 0;
    /*setInterval(() => {
      document.getElementById('big-image').style.backgroundImage = 'url('+this.images[i]+')';
      if(i == this.images.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }, 5000);*/
  },
  computed: {

  },
  methods: {
    handleLeave(origin, destination, direction) {
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSection = destination.index;

      console.log('activeSection: ', this.activeSection);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
        console.log('going up');
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
        console.log('going down');
      }

      if(destination.index == 0) {
        console.log('on first slide');
      }
    },
    handleSlideLeave(origin, destination, direction) {
      console.clear();
      console.log('origin: ', origin);
      console.log('destination: ', destination);
      console.log('direction: ', direction);
  
      this.activeSlide = destination.index;

      console.log('activeSlide: ', this.activeSlide);

      if(direction == 'up') {
        this.triggerUp = true;
        this.triggerDown = false;
      }
      else {
        this.triggerDown = true;
        this.triggerUp = false;
      }
    },
    handleMouseEnter(i, index) {
      console.clear();
      console.log('enter' , index);
      this.hover = true;
      this.currentPreview = i.thumb;
      this.currentProjectText = i.description;
      this.currentProjectTitle = i.title;
      this.context = index;

      console.log(this.currentPreview);
    },
    handleMouseLeave(i, index) {
      console.clear();
      console.log('leave', index);

      this.hover = false;

      /*if(!this.modalActive) {}*/
    },
    handleScroll() {
      //console.log(scrollY);
      //this.bannerOffset = scrollY;
    },
    move(section) {
      this.$refs.fullpage.api.moveTo(section)
    },
    enterOn(section, context) {
      if(context == 'default') {
        return ( this.activeSection == (section - 1) ? 'enter' : 'stage-in' ) // TODO: adjust for up and down transitions
      } else if(context == 'big-image') {
        return ( this.activeSection == (section - 1) ? 'big-image-enter' : 'big-image-stage' )
      } else {
        console.log('invalid context');
      }
    }
  }
}
</script>

<template>
  <div class="home">

    <!-- optional top layer for modals & such -->
    <!--div class="top-layer">
      <div :class="( smallEnter ? 'enter' : 'stage-left' )" class="modal-small">This is some text</div>
      <div :class="( bigEnter ? 'enter' : 'stage-left' )" class="modal-big"></div>
    </div-->

    <!-- social media buttons -->
    <div class="soc-container">
      <a href="#" target="_blank"><div class="hoverable soc-button fb"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button insta"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button tw"></div></a>
      <a href="#" target="_blank"><div class="hoverable soc-button li"></div></a>
    </div>

    <!-- optional wave -->
    <!--div :style="'left:' + waveOffset" :class="(waveLeft ? 'wave-left' : 'wave-right' )" class="wave-panel">
        <div class="wave"></div>
    </div-->

    <!-- navigation -->
    <div id="nav" class="hoverable">
      <div class="link-list hoverable">

      </div>
    </div>

    <!-- main (fullpage.js; TODO: Configuure locomotive scroll) -->
    <full-page ref="fullpage" :options="options" id="fullpage">

      <!-- Section 1 (landing page) -->
      <section style="background: linear-gradient(#000, #111)" class="section landing">
        <div class="landing-container" :class="enterOn(1, 'default')">
          <div class="logo"></div>
          <p class="subtitle">Dismantling substance abuse and save young lives.</p>
          <div class="button-container">
            <div @click="move(2)" class="landing-button">Learn More</div>
            <div @click="move(3)" class="landing-button secondary">Donate</div>
          </div>
          <!--div @click="goDown" class="arrows hoverable"></div-->
        </div>
      </section>
      
      <!-- About -->
      <section style="background: linear-gradient(#111, #222)" class="section">
        <div class="slide">
          <div class="page-container">
            <div class="about-container">
              <div class="about-text" :class="enterOn(2, 'default')">
                <p><b>Derrick Brew, Jr.</b>, affectionately known as “Man Man”, was born on November 22, 1995. Beloved by many, Derrick was and magnetic personality who brought joy and laughter everywhere he went.</p>
                <p>Derrick was socially and creatively active, with passions for sports, music, dancing, content creation and more.</p>
                <p>On the evening of October 8, 2020 in Irvine, California, Derrick peacefully parted this life. He was twenty-four years young.</p>
                <p>The Derrick Brew Jr. Foundation aims to provide resources and outreach for drug abuse awareness, with a mission to dismantle the horrors of substance abuse.</p>
              </div>
              <div id="big-image" class="image-slides full-image" :class="enterOn(2, 'big-image')"></div>
            </div>
          </div>        
        </div>
        <div style="background: #222" class="slide">
          <div class="page-container">
            About2
          </div>        
        </div>
        <div style="background: #222" class="slide">
          <div class="page-container">
            <div class="page-container">
              About3
            </div>
          </div>
        </div>
      </section>

      <!-- Donate -->
      <section style="background: linear-gradient(#222,#333)" class="section">
        <div class="page-container">
          <div class="donation-container" :class="enterOn(3, 'default')">
            <div class="icon clock"></div>
            Donation Portal is Coming Soon
          </div>
        </div>
      </section>

      <!-- Section 4 w slides -->
      <section class="section">
        <div style="background: linear-gradient(#333,#444)" class="slide">
          <div class="page-container">
            <div class="grid-container">
              <a href="https://nasadad.org/prevention-resources/"><div class="item item1">
                <div class="resource-icon icon1"></div>
                <div class="resource-title"><b>NASADAD</b> | Prevention Resources</div>
              </div></a>
              <a href="https://www.samhsa.gov/find-help/national-helpline"><div class="item item2">
                <div class="resource-icon icon2"></div>
                <div class="resource-title"><b>SAMHSA</b> | National Helpline</div>
              </div></a>
              <a href="https://www.drugabuse.gov/publications/principles-drug-addiction-treatment-research-based-guide-third-edition/resources"><div class="item item3">
                <div class="resource-icon icon3"></div>
                <div class="resource-title"><b>NIH</b> | Addiction Treatment Resources</div>
              </div></a>
              <a href="https://preventionlane.org/substance-abuse-prevention-online-resources"><div class="item item4">
                <div class="resource-icon icon4"></div>
                <div class="resource-title"><b>Prevention Lane</b> | Substance Abuse Prevention</div>
              </div></a>
              <a href="https://drugfreegeneration.org/"><div class="item item5">
                <div class="resource-icon icon5"></div>
                <div class="resource-title"><b>Drug Free Generation</b> | Prevention Resources</div>
              </div></a>
              <a href="https://www.campusdrugprevention.gov/resources"><div class="item item6">
                <div class="resource-icon icon6"></div>
                <div class="resource-title">Campus Drug Prevention</div>
              </div></a>
              <a href="https://www.adolescenthealth.org/Resources/Clinical-Care-Resources/Substance-Use/Substance-Use-Resources-For-Adolesc.aspx"><div class="item item7">
                <div class="resource-icon icon7"></div>
                <div class="resource-title"><b>SAHM</b> | Substance Use Resources For Adolescents and Young Adults</div>
              </div></a>
              <a href="https://youth.gov/youth-topics/substance-abuse/evidence-based-programs-youth-substance-abuse-prevention-and-treatment"><div class="item item8">
                <div class="resource-icon icon8"></div>
                <div class="resource-title"><b>Prevention</b> | youth.gov</div>
              </div></a>
            </div>
          </div>        
        </div>
      </section>

      <!-- Contact -->
      <section style="background: linear-gradient(#444,#555)" class="section">
        <div class="page-container">
          Contact information
        </div>
      </section>

    </full-page>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables';

$buttonHeight: 50px;

a {
  text-decoration: none;
  color: white;
}

.grid-container {
  border-radius: $rad;
  width: 60%;
  height: 60%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  text-align: center;
  color: white;

  .item {
    background: rgba(white, 0.05);
    height: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 100ms;

    &:hover {
      transform: scale(0.98);
      background: rgba(white, 0.1);
    }

    .resource-icon {
      display: none;
      background: red;
      height: 36px;
      width: 36px;
      margin-bottom: 24px;
    }
  }
}

.about-container {
  display: flex;
  width: 100%;
}

.clock {
  background-image: $clock;
  margin-bottom: 24px;
}

.about-text {
  width: 100%;
  text-align: left;
  line-height: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background: #444;

  p {
    width: 420px;
  }
}


.image-slides {
  height: 100vh;
  background-image: url('../assets/manman/illustration.png');
  filter: brightness(0.7) grayscale(1);
}

.donation-container {
  border-radius: $rad;
  background: rgba(white, 0.05);
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}

.secondary {
  background: transparent !important;
  color: white !important;
}

.button-container {
  display: flex;
}

.subtitle {
  width: 400px;
  line-height: 2;
  opacity: 0.4;
}

.logo {
  background-image: url('../assets/sample-logo-white.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 500px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
}

.landing-button {
  color: black;
  background: white;
  border-radius: $buttonHeight;
  height: $buttonHeight;;
  width: 150px;
  text-align: center;
  padding: 0px;
  line-height: $buttonHeight;
  border: 2px solid white;
  font-weight: bold;
  margin-top: 12px;
  transition: 200ms;
  cursor: pointer;
  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    transform: scale(0.9);
  }
}

.page-container {
  height: 100vh;
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrows {
  position: relative;
  width: 30px;
  height: 30px;
  transform: scale(0.5);
  margin-top: 36px;
}

.arrows:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
  border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
  transform: translate(26.66667px, 106.66667px) rotate(-45deg);
  animation: arrows 3s linear infinite;
}

.arrows:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-left: 26.66667px solid rgba(0, 0, 0, 0.7);
  border-bottom: 26.66667px solid rgba(0, 0, 0, 0.7);
  transform: translate(53.33333px, 0px) rotate(-45deg);
  animation: arrows 3s linear infinite -1.5s;
}

@keyframes arrows {
  0% {
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
    transform: translate(-13.33333px, -53.33333px) rotate(-45deg);
  }
  10%, 90% {
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  50% {
    border-left: 10px solid rgba(255, 255, 255, 0.7);
    border-bottom: 10px solid rgba(255, 255, 255, 0.7);
    transform: translate(-13.33333px, 0px) rotate(-45deg);
  }
  100% {
    border-left: 26.66667px solid transparent;
    border-bottom: 26.66667px solid transparent;
    transform: translate(-13.33333px, 53.33333px) rotate(-45deg);
  }
}

.top-layer {
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100%;
  display: flex;
  pointer-events: none;
  justify-content: center;
  align-items: center;
}

.soc-container {
  position: fixed;
  top: $pad;
  right: $pad;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  //background: red;
}

.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;

  h1 {
    font-size: 48px;
  }
}

.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.wave-panel {
  background: #181818;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0px;
  z-index: 9;
  transition: 2s;
  pointer-events: none;

  .wave {
    height: 100vh;
    transform: translateX(0px) scale(4);
    width: 175px;
    position: absolute;
    background-image: url('../assets/wave.svg');
    background-size: contain;
    background-position-y: 50%;
    background-repeat: repeat-y;
    transition: 2s;
  }
}

.wave-left {
  .wave {
    background-position-y: 7% !important;
    //background: rgba(yellow, 0.2);
  }
}

.wave-right {
  .wave {
    background-position-y: 50% !important;
    //background: rgba(aqua, 0.2);
  }
}

.main-title {
  //background:red;
  width: 70px;
  background-image: url("../assets/sample-emblem-white.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 70px;
  margin: 42px;
}

.hoverable {
  cursor: pointer;
}

.project-text {
  font-size: 14px !important;
}

.mwm-expanded {
  background: white;
  width: auto;
  height: 70%;
  border-radius: 18px;
  min-width: 25%;
}

.mwm-inactive {
  //background: blue;
  width: 100vw;
  height: 100vh;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  
  img {
    transition: 600ms;
    transform: scale(0.8);
    opacity: 0;
  }
}

.mvm-active {
  background: rgba(black, 0.8);
  width: 100vw !important;
  height: 100vh !important;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 999;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition-delay: 150ms;

  img {
    transition: 600ms;
    transform: scale(1);
  }
}

.modal-title {
  font-size: 36px;
}

.image-list {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.modal-text {
  //@extendanimation: flyleft 1s ease forwards 3s;
  width:300px;
  text-align: left;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  //background: purple;
  transition: 1s;
}

#nav {
  position: fixed;
  z-index: 9999;

  h1 {
    padding-left: 18px;
  }

  ul {
    list-style: none;
    text-align: left;
    font-family: 'Inconsolata', monospace;

    li {
      margin-top: 6px;
      font-size: 18px;

      &:hover {
        span {
          opacity: 1;
          padding-right: 8px;
        }
      }

      span {
        opacity: 0;
        margin-right: 12px;
        transition: 300ms;
        font-weight: bold;
      }
    }
  }

  a {
    color: white;
    text-decoration: none;
    opacity: 0.7;
    //cursor: none;

    &.router-link-exact-active {
      color: white;
      opacity: 1;
      font-weight: bold;
    }
  }
}

//grid flyin animation
.grid-item {
  background: #555;
  height: 250px;
  transition: 1.2s;

  &:hover {
    //transform: scale(0.95);
    //filter:hue-rotate(145deg);
  }

  &:nth-child(1) {
    transition-delay: 1.4s;  
  }

  &:nth-child(2) {
    transition-delay: 1.2s;  
  }

  &:nth-child(3) {
    transition-delay: 1s;  
  }

  &:nth-child(4) {
    transition-delay: 1.6s;  
  }

  &:nth-child(5) {
    transition-delay: 1.4s;  
  }

  &:nth-child(6) {
    transition-delay: 1.2s;  
  }

  &:nth-child(7) {
    transition-delay: 1.8s;  
  }

  &:nth-child(8) {
    transition-delay: 1.6s;  
  }

  &:nth-child(9) {
    transition-delay: 1.4s;  
  }
}

.modal-active {
  background: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  transition-delay: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
}

.modal-inactive {
  background: black;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  transition: 600ms;
  margin: auto;
  left: 0px;
  top: 0px;
  overflow: auto;
  pointer-events: none;
}



.blur {
  filter: blur(24px);
}

.clear {
  filter: blur(0px);
}

@media only screen and (max-width: 900px) {

}
</style>