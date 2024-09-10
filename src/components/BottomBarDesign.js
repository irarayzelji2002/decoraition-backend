import "../css/bottomBar.css";
import Button from "@mui/joy/Button";

function BottomBarDesign() {
  return (
    <div className="bottomBar">
      <Button
        size="md"
        color="#302f37"
        sx={{
          mr: 2,
          ":hover": {
            backgroundColor: "#2c2f33",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 358 278"
            style={{ marginBottom: "6px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M99.2857 0C77.3808 0 59.5714 17.8094 59.5714 39.7143V178.714C59.5714 200.619 77.3808 218.429 99.2857 218.429H317.714C339.619 218.429 357.429 200.619 357.429 178.714V39.7143C357.429 17.8094 339.619 0 317.714 0H99.2857ZM245.732 66.2112L305.304 155.568C308.344 160.16 308.654 165.993 306.048 170.833C303.442 175.674 298.416 178.714 292.893 178.714H124.107C118.398 178.714 113.186 175.425 110.704 170.275C108.221 165.125 108.904 158.981 112.503 154.513L152.217 104.871C155.072 101.333 159.292 99.2857 163.821 99.2857C168.351 99.2857 172.633 101.333 175.425 104.871L186.161 118.274L220.911 66.1491C223.703 62.0536 228.357 59.5714 233.321 59.5714C238.286 59.5714 242.94 62.0536 245.732 66.2112ZM119.143 59.5714C119.143 54.305 121.235 49.2542 124.959 45.5303C128.683 41.8064 133.734 39.7143 139 39.7143C144.266 39.7143 149.317 41.8064 153.041 45.5303C156.765 49.2542 158.857 54.305 158.857 59.5714C158.857 64.8379 156.765 69.8886 153.041 73.6125C149.317 77.3365 144.266 79.4286 139 79.4286C133.734 79.4286 128.683 77.3365 124.959 73.6125C121.235 69.8886 119.143 64.8379 119.143 59.5714ZM29.7857 54.6071C29.7857 46.354 23.146 39.7143 14.8929 39.7143C6.63973 39.7143 0 46.354 0 54.6071V193.607C0 240.209 37.7906 278 84.3929 278H282.964C291.217 278 297.857 271.36 297.857 263.107C297.857 254.854 291.217 248.214 282.964 248.214H84.3929C54.2348 248.214 29.7857 223.765 29.7857 193.607V54.6071Z"
              fill="white"
            />
            <path
              d="M99.2857 0C77.3808 0 59.5714 17.8094 59.5714 39.7143V178.714C59.5714 200.619 77.3808 218.429 99.2857 218.429H317.714C339.619 218.429 357.429 200.619 357.429 178.714V39.7143C357.429 17.8094 339.619 0 317.714 0H99.2857ZM245.732 66.2112L305.304 155.568C308.344 160.16 308.654 165.993 306.048 170.833C303.442 175.674 298.416 178.714 292.893 178.714H124.107C118.398 178.714 113.186 175.425 110.704 170.275C108.221 165.125 108.904 158.981 112.503 154.513L152.217 104.871C155.072 101.333 159.292 99.2857 163.821 99.2857C168.351 99.2857 172.633 101.333 175.425 104.871L186.161 118.274L220.911 66.1491C223.703 62.0536 228.357 59.5714 233.321 59.5714C238.286 59.5714 242.94 62.0536 245.732 66.2112ZM119.143 59.5714C119.143 54.305 121.235 49.2542 124.959 45.5303C128.683 41.8064 133.734 39.7143 139 39.7143C144.266 39.7143 149.317 41.8064 153.041 45.5303C156.765 49.2542 158.857 54.305 158.857 59.5714C158.857 64.8379 156.765 69.8886 153.041 73.6125C149.317 77.3365 144.266 79.4286 139 79.4286C133.734 79.4286 128.683 77.3365 124.959 73.6125C121.235 69.8886 119.143 64.8379 119.143 59.5714ZM29.7857 54.6071C29.7857 46.354 23.146 39.7143 14.8929 39.7143C6.63973 39.7143 0 46.354 0 54.6071V193.607C0 240.209 37.7906 278 84.3929 278H282.964C291.217 278 297.857 271.36 297.857 263.107C297.857 254.854 291.217 248.214 282.964 248.214H84.3929C54.2348 248.214 29.7857 223.765 29.7857 193.607V54.6071Z"
              fill="url(#paint0_linear_1850_14961)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1850_14961"
                x1="178.714"
                y1="0"
                x2="178.714"
                y2="278"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F9A754" />
                <stop offset="0.5" stop-color="#F26B27" />
                <stop offset="1" stop-color="#EF4E59" />
              </linearGradient>
            </defs>
          </svg>

          <span style={{ color: "#ff8344" }}>Design</span>
        </div>
      </Button>
      <Button
        size="md"
        color="#302f37"
        sx={{
          ":hover": {
            backgroundColor: "#2c2f33",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 437 380"
            style={{ marginBottom: "6px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57 0V114H19V0H57ZM19 380H57V266H19V380ZM76 190C76 182.484 73.7713 175.137 69.5959 168.888C65.4204 162.639 59.4856 157.769 52.542 154.893C45.5984 152.016 37.9579 151.264 30.5866 152.73C23.2153 154.196 16.4444 157.816 11.13 163.13C5.81556 168.444 2.19641 175.215 0.730176 182.587C-0.736062 189.958 0.0164647 197.598 2.89259 204.542C5.76872 211.486 10.6393 217.42 16.8883 221.596C23.1374 225.771 30.4843 228 38 228C59.09 228 76 211.09 76 190ZM437 76V304C437 325.09 420.09 342 399 342H171C160.922 342 151.256 337.996 144.13 330.87C137.004 323.744 133 314.078 133 304V228L95 190L133 152V76C133 65.9218 137.004 56.2563 144.13 49.1299C151.256 42.0036 160.922 38 171 38H399C420.09 38 437 54.91 437 76ZM342 209H190V247H342V209ZM380 133H190V171H380V133Z"
              fill="white"
            />
          </svg>

          <span style={{ color: "white" }}>Timeline</span>
        </div>
      </Button>
      <Button
        size="md"
        color="#302f37"
        sx={{
          ":hover": {
            backgroundColor: "#2c2f33",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 337 354"
            style={{ marginBottom: "6px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M243.737 0.00012207C219.119 0.0275505 195.518 9.64444 178.11 26.741C160.703 43.8375 150.911 67.0176 150.883 91.1957C150.883 169.23 235.296 228.165 238.894 230.632C240.314 231.608 242.004 232.132 243.737 232.132C245.47 232.132 247.161 231.608 248.581 230.632C252.179 228.165 336.592 169.23 336.592 91.1957C336.564 67.0176 326.772 43.8375 309.365 26.741C291.957 9.64444 268.355 0.0275505 243.737 0.00012207ZM243.737 58.0337C250.416 58.0337 256.944 59.9786 262.496 63.6225C268.049 67.2664 272.377 72.4456 274.932 78.5052C277.488 84.5647 278.157 91.2325 276.854 97.6653C275.551 104.098 272.335 110.007 267.613 114.645C262.891 119.283 256.875 122.441 250.325 123.721C243.775 125 236.986 124.343 230.816 121.833C224.646 119.324 219.373 115.073 215.663 109.62C211.952 104.166 209.972 97.7546 209.972 91.1957C209.972 82.4006 213.529 73.9657 219.862 67.7466C226.194 61.5275 234.782 58.0337 243.737 58.0337Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M130.136 150.765H29.8614C30.1919 144.769 30.6563 139.341 31.3091 134.38C33.4843 117.848 37.5081 108.742 43.9279 102.178C50.3624 95.6175 59.2805 91.5083 75.4599 89.287C80.3154 88.6203 85.6281 88.1459 91.4961 87.8084V112.195C91.4961 120.388 97.9984 127.03 106.019 127.03C108.153 127.03 110.179 126.56 112.004 125.715C120.624 118.457 120.306 107.479 119.924 94.2971C119.842 91.4672 119.757 88.5346 119.757 85.5163C119.757 70.9247 116.792 67.8964 114.043 65.0881C109.398 60.344 101.119 58.4563 92.8401 58.0319C85.124 58.4131 78.0523 58.9948 71.5905 59.8819C52.1832 62.5464 36.1235 68.2083 23.3966 81.1904L23.3861 81.2012C10.6726 94.1962 5.12975 110.604 2.52143 130.428C1.28835 139.799 0.658215 150.427 0.336247 162.412C0.116073 163.438 4.73877e-05 164.505 4.73877e-05 165.6C4.73877e-05 166.455 0.070966 167.294 0.207126 168.11C-0.00022751 179.147 -0.000115394 191.271 7.42397e-06 204.55V206.752C-0.000319655 237.288 -0.000581424 261.715 2.52143 280.882C5.12928 300.702 10.6714 317.112 23.3896 330.096C36.1114 343.09 52.1752 348.756 71.5845 351.423C80.7595 352.683 91.1644 353.327 102.897 353.656C103.903 353.881 104.948 354 106.019 354C106.857 354 107.679 353.928 108.478 353.788C119.284 354 131.153 354 144.154 354H145.232C153.253 354 159.755 347.358 159.755 339.165C159.755 325.395 165.111 312.189 174.643 302.451C184.176 292.714 197.105 287.244 210.586 287.244C218.607 287.244 225.11 280.602 225.11 272.409C225.11 264.216 218.607 257.575 210.586 257.575C189.401 257.575 169.084 266.171 154.104 281.472C142.596 293.227 134.962 308.201 132.041 324.322C128.042 324.313 124.213 324.298 120.543 324.27V180.434L125.172 180.403C131.81 180.403 145.085 177.557 145.085 166.174C145.085 165.481 145.057 164.813 145.004 164.168C144.139 155.07 136.588 151.639 130.136 150.765ZM29.1055 180.434C29.0491 188.124 29.0465 196.498 29.0465 205.653C29.0465 237.541 29.0774 259.969 31.3091 276.93C33.4849 293.467 37.51 302.564 43.925 309.112C50.3521 315.677 59.2701 319.794 75.4561 322.018C80.3126 322.685 85.6266 323.16 91.4961 323.498V180.434H29.1055Z"
              fill="white"
            />
            <path
              d="M275.942 235.323C264.323 235.323 261.031 245.29 261.031 250.235C260.721 260.491 260.162 269.265 259.153 276.924C256.977 293.456 252.94 302.565 246.516 309.122C239.372 316.428 229.135 320.698 209.163 322.706C201.181 323.509 195.347 330.77 196.133 338.923C196.919 347.077 204.027 353.036 212.009 352.233C234.518 349.969 252.88 344.599 267.068 330.089C279.786 317.102 285.331 300.697 287.941 280.879C289.232 271.07 289.863 259.884 290.171 247.206C289.191 242.071 285.539 235.323 275.942 235.323Z"
              fill="white"
            />
          </svg>

          <span style={{ color: "white" }}>Plan Map</span>
        </div>
      </Button>
      <Button
        size="md"
        color="#302f37"
        sx={{
          ":hover": {
            backgroundColor: "#2c2f33",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 1081 1047"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: "6px" }}
          >
            <path
              d="M1066.26 716.721C1090.83 750.108 1083.7 797 1050.31 821.571L812.849 996.572C768.957 1028.83 716.063 1046.28 661.48 1046.28H60.5067C27.3068 1046.28 0.484375 1019.46 0.484375 986.256V866.212C0.484375 833.013 27.3068 806.191 60.5067 806.191H129.532L213.751 738.666C256.329 704.529 309.224 686.147 363.807 686.147H660.73C693.929 686.147 720.752 712.97 720.752 746.169C720.752 779.369 693.929 806.191 660.73 806.191H510.674C494.168 806.191 480.663 819.696 480.663 836.202C480.663 852.708 494.168 866.212 510.674 866.212H736.883L961.404 700.778C994.791 676.206 1041.68 683.334 1066.26 716.721Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M531.432 618.33C702.128 618.33 840.504 479.953 840.504 309.257C840.504 138.561 702.128 0.18457 531.432 0.18457C360.736 0.18457 222.359 138.561 222.359 309.257C222.359 479.953 360.736 618.33 531.432 618.33ZM584.268 133.929V114.101H583.894C583.894 88.9862 563.872 68.7807 538.986 68.7807C514.099 68.7807 494.078 88.9862 494.078 114.101V135.062C481.167 138.461 468.256 143.371 456.28 150.547C428.587 167.165 404.262 196.812 404.449 240.055C404.636 281.788 428.961 308.036 454.222 323.332C475.553 336.362 502.124 344.482 522.332 350.525L525.888 351.658C549.839 359.022 565.931 364.31 576.596 371.108C584.081 375.829 584.081 377.906 584.081 379.794V380.172C584.268 384.515 583.332 386.781 582.584 387.914C581.836 389.236 580.152 391.124 576.596 393.391C568.924 398.111 555.639 401.699 540.67 401.133C521.023 400.377 502.685 394.146 477.237 385.459C475.018 384.68 472.749 383.901 470.405 383.097C468.203 382.341 465.934 381.562 463.578 380.738C440.001 372.807 414.553 385.648 406.694 409.442C398.836 433.235 411.559 458.917 435.136 466.848C437.487 467.597 439.92 468.429 442.435 469.289C443.723 469.729 445.032 470.177 446.363 470.625C447.172 470.9 447.99 471.18 448.815 471.461C462.117 476.003 477.528 481.264 494.265 485.354V506.881C494.265 531.996 514.286 552.202 539.173 552.202C564.059 552.202 584.081 531.996 584.081 506.881V486.865C597.928 483.465 611.4 477.989 623.937 470.247C652.566 452.119 674.458 421.149 673.897 378.661C673.335 337.117 650.133 310.114 624.498 293.874C602.044 279.711 574.351 271.213 553.581 264.982L551.897 264.415C527.572 257.051 511.48 251.952 500.627 245.343C496.711 243.038 495.214 241.307 494.647 240.651C494.563 240.555 494.5 240.481 494.452 240.433V239.3C494.452 236.279 495.201 234.957 495.762 234.013C496.51 232.88 498.382 230.802 502.311 228.348C511.106 223.249 524.952 219.85 538.612 220.039C555.639 220.228 574.725 224.004 595.121 229.481C619.072 235.901 643.771 221.549 650.133 197.378C656.495 173.207 642.274 148.281 618.323 141.86C607.845 139.028 596.244 136.195 584.268 133.929Z"
              fill="white"
            />
          </svg>
          <span style={{ color: "white" }}>Budget</span>
        </div>
      </Button>
    </div>
  );
}

export default BottomBarDesign;