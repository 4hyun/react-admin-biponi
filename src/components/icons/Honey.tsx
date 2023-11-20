import { SvgIcon, SvgIconProps } from '@mui/material'
import React from 'react'

const Honey = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path d="M13.5658 14.2208C13.5549 14.0954 13.4814 13.9795 13.3723 13.9165L11.9798 13.1125V11.5033C11.9798 11.3636 11.9052 11.2346 11.7843 11.1649L10.1956 10.2481C10.0748 10.1784 9.92603 10.1783 9.80517 10.248L8.21607 11.165C8.09521 11.2347 8.02075 11.3637 8.02075 11.5033V13.1124L6.62739 13.9164C6.50642 13.9862 6.43188 14.1152 6.43188 14.2548V16.0896C6.43188 16.2292 6.50642 16.3582 6.62739 16.428L8.21607 17.3447C8.27649 17.3796 8.34392 17.397 8.41138 17.397C8.47884 17.397 8.54626 17.3796 8.60669 17.3447L10.0002 16.5406L11.394 17.3448C11.4544 17.3796 11.5218 17.397 11.5891 17.397C11.6566 17.397 11.724 17.3796 11.7844 17.3447L13.3722 16.4279C13.4915 16.359 13.5675 16.2272 13.5675 16.0896V14.2548C13.5676 14.2436 13.5668 14.2319 13.5658 14.2208ZM8.802 11.7288L10.0001 11.0374L11.1985 11.729V13.1124L10.0003 13.8038L8.80204 13.1125V11.7288H8.802ZM8.41138 16.5553L7.21314 15.8639V14.4805L8.41138 13.789L9.60966 14.4804V15.864L8.41138 16.5553ZM11.589 16.5554L10.3909 15.864V14.4803L11.589 13.789L12.7863 14.4803V15.864L11.589 16.5554Z" />
      <path d="M18.8821 8.63844C19.2262 8.11367 19.1794 7.40207 18.76 6.78125L17.0575 4.26055V2.75859C17.6438 2.58883 18.0739 2.04742 18.0739 1.40711C18.0739 0.631211 17.4427 0 16.6669 0H3.33247C2.55661 0 1.9254 0.631211 1.9254 1.40707C1.9254 2.04738 2.35552 2.58883 2.94185 2.75855V4.26047L1.23927 6.78137C0.820285 7.40242 0.774035 8.11422 1.11845 8.63894C1.152 8.69008 1.18911 8.73773 1.22833 8.78297C1.00474 9.69633 0.891223 10.6404 0.891223 11.5927C0.891223 13.2516 1.22302 14.8371 1.87739 16.3053C2.50345 17.7098 3.41853 18.9548 4.52372 19.9055C4.59458 19.9664 4.68497 20 4.77845 20H15.2219C15.3154 20 15.4057 19.9664 15.4766 19.9055C16.5817 18.9549 17.4966 17.7099 18.1224 16.3052C18.7764 14.8373 19.108 13.2518 19.108 11.5927C19.108 10.6371 18.9946 9.69355 18.7714 8.78418C18.8111 8.73859 18.8482 8.69008 18.8821 8.63844ZM2.70665 1.40707C2.70665 1.06203 2.98739 0.78125 3.33247 0.78125H16.6668C17.0119 0.78125 17.2927 1.06203 17.2927 1.40707C17.2927 1.75211 17.0119 2.03289 16.6668 2.03289H11.7518C11.5361 2.03289 11.3612 2.20781 11.3612 2.42352C11.3612 2.63922 11.5361 2.81414 11.7518 2.81414H16.2762V3.98941H3.7231V2.81418H8.24415C8.45985 2.81418 8.63477 2.63926 8.63477 2.42355C8.63477 2.20785 8.45985 2.03293 8.24415 2.03293H3.33247C2.98739 2.03293 2.70665 1.75215 2.70665 1.40707ZM15.0753 19.2187H4.92521C2.8561 17.3803 1.67251 14.6099 1.67251 11.5928C1.67251 10.7867 1.75958 9.98746 1.93111 9.21031C2.13978 9.26215 2.36599 9.26945 2.59755 9.22621C2.94716 9.16039 3.21802 8.96199 3.44841 8.71648C3.82333 9.05156 4.27806 9.23715 4.7463 9.23711H4.747C5.22095 9.23691 5.68103 9.04652 6.0581 8.70344C6.43649 9.05344 6.89091 9.24191 7.37227 9.24211H7.37294C7.85481 9.24207 8.30989 9.05336 8.68892 8.70277C9.06501 9.04328 9.52509 9.23215 10.0002 9.23215C10.4753 9.23215 10.9353 9.04336 11.3114 8.70293C11.6899 9.0532 12.1445 9.24191 12.6261 9.24211H12.6267C13.1083 9.24207 13.5633 9.05355 13.9422 8.70328C14.3195 9.04664 14.7799 9.23711 15.2541 9.23711C15.7222 9.23711 16.177 9.05141 16.5515 8.71625C16.7824 8.96183 17.0534 9.16039 17.4025 9.22637C17.5047 9.24539 17.6057 9.25469 17.7048 9.25469C17.8302 9.25469 17.9521 9.23949 18.0686 9.21055C18.2398 9.98465 18.3268 10.7838 18.3268 11.5928C18.3268 14.6105 17.1437 17.3809 15.0753 19.2187ZM18.2288 8.21004C18.0913 8.41957 17.8362 8.51262 17.5465 8.45851C17.345 8.42043 17.1582 8.26051 16.8803 7.88797C16.8066 7.78914 16.6906 7.7309 16.5672 7.7309C16.5672 7.7309 16.5671 7.7309 16.567 7.7309C16.4436 7.73094 16.3275 7.7893 16.2539 7.88824C15.9813 8.25426 15.6262 8.45586 15.254 8.45586C14.8818 8.45586 14.5266 8.25426 14.2541 7.88824C14.1804 7.7893 14.0643 7.73098 13.941 7.7309C13.9409 7.7309 13.9408 7.7309 13.9407 7.7309C13.8175 7.7309 13.7014 7.7891 13.6277 7.88793C13.3519 8.25742 12.9965 8.4609 12.6266 8.4609C12.6265 8.4609 12.6264 8.4609 12.6263 8.4609C12.2567 8.46074 11.9016 8.25734 11.6265 7.88812C11.5527 7.78922 11.4366 7.73094 11.3132 7.73094C11.1899 7.73094 11.0737 7.78922 11 7.88816C10.7296 8.25105 10.3745 8.45094 10 8.45094C9.6256 8.45094 9.27048 8.25105 9.00009 7.88816C8.92641 7.78926 8.81036 7.73098 8.68696 7.73094C8.68696 7.73094 8.68688 7.73094 8.68684 7.73094C8.56356 7.73094 8.44751 7.7891 8.37376 7.88797C8.09798 8.25746 7.74251 8.46094 7.37267 8.46094C7.37255 8.46094 7.37243 8.46094 7.37231 8.46094C7.00271 8.46078 6.64767 8.25738 6.37255 7.88816C6.2988 7.78922 6.18267 7.73094 6.05923 7.73098C5.93579 7.73101 5.81966 7.78933 5.74595 7.88832C5.47353 8.25422 5.11853 8.45578 4.74638 8.45594C4.74622 8.45594 4.7461 8.45594 4.74599 8.45594C4.37353 8.45594 4.01806 8.25426 3.74497 7.88808C3.67122 7.78922 3.55517 7.73098 3.43181 7.73098C3.43169 7.73098 3.43161 7.73098 3.4315 7.73098C3.30806 7.73109 3.19193 7.78949 3.11829 7.88855C2.84173 8.26062 2.65513 8.42043 2.45333 8.45844C2.16384 8.5123 1.90876 8.41976 1.77126 8.21035C1.60025 7.9498 1.64337 7.57898 1.8865 7.21852L3.5397 4.77074H6.14571L5.24103 6.04898C5.11638 6.22512 5.1581 6.46887 5.33419 6.59348C5.40274 6.64199 5.48149 6.66531 5.55954 6.66531C5.682 6.66531 5.80263 6.60785 5.87872 6.50031L7.10286 4.77074H9.60927V6.27465C9.60927 6.49035 9.78419 6.66527 9.99989 6.66527C10.2156 6.66527 10.3905 6.49035 10.3905 6.27465V4.77074H12.8969L14.1211 6.50031C14.1972 6.60785 14.3178 6.66531 14.4402 6.66531C14.5182 6.66531 14.597 6.64199 14.6656 6.59348C14.8417 6.46887 14.8834 6.22508 14.7588 6.04898L13.8541 4.77074H16.459L18.1122 7.21859C18.3561 7.57894 18.3995 7.94965 18.2288 8.21004Z" />
      <path d="M9.998 2.81396H10.0002C10.2159 2.81396 10.3898 2.63904 10.3898 2.42334C10.3898 2.20764 10.2137 2.03271 9.99804 2.03271C9.78234 2.03271 9.60742 2.20764 9.60742 2.42334C9.60742 2.63904 9.7823 2.81396 9.998 2.81396Z" />
    </SvgIcon>
  )
}

export default Honey
