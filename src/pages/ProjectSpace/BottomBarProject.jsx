import "../../css/bottomBar.css";
import { Link } from "react-router-dom";
import Button from "@mui/joy/Button";

function BottomBarDesign({
  Design = false,
  PlanMap = false,
  Timeline = false,
  Budget = false,
  projId,
}) {
  return (
    <div className="bottomBar">
      <Button
        size="md"
        component={Link}
        to={`/project/${projId}`}
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
          {Design ? (
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
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 412 320"
              style={{ marginBottom: "6px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M114.286 0C89.0714 0 68.5714 20.5 68.5714 45.7143V205.714C68.5714 230.929 89.0714 251.429 114.286 251.429H365.714C390.929 251.429 411.429 230.929 411.429 205.714V45.7143C411.429 20.5 390.929 0 365.714 0H114.286ZM282.857 76.2143L351.429 179.071C354.929 184.357 355.286 191.071 352.286 196.643C349.286 202.214 343.5 205.714 337.143 205.714H142.857C136.286 205.714 130.286 201.929 127.429 196C124.571 190.071 125.357 183 129.5 177.857L175.214 120.714C178.5 116.643 183.357 114.286 188.571 114.286C193.786 114.286 198.714 116.643 201.929 120.714L214.286 136.143L254.286 76.1429C257.5 71.4286 262.857 68.5714 268.571 68.5714C274.286 68.5714 279.643 71.4286 282.857 76.2143ZM137.143 68.5714C137.143 62.5093 139.551 56.6955 143.838 52.409C148.124 48.1224 153.938 45.7143 160 45.7143C166.062 45.7143 171.876 48.1224 176.162 52.409C180.449 56.6955 182.857 62.5093 182.857 68.5714C182.857 74.6335 180.449 80.4473 176.162 84.7339C171.876 89.0204 166.062 91.4286 160 91.4286C153.938 91.4286 148.124 89.0204 143.838 84.7339C139.551 80.4473 137.143 74.6335 137.143 68.5714ZM34.2857 62.8571C34.2857 53.3571 26.6429 45.7143 17.1429 45.7143C7.64286 45.7143 0 53.3571 0 62.8571V222.857C0 276.5 43.5 320 97.1429 320H325.714C335.214 320 342.857 312.357 342.857 302.857C342.857 293.357 335.214 285.714 325.714 285.714H97.1429C62.4286 285.714 34.2857 257.571 34.2857 222.857V62.8571Z"
                fill="var(--color-white)"
              />
            </svg>
          )}

          <span style={{ color: Design ? "#ff8344" : "var(--color-white)" }}>
            Design
          </span>
        </div>
      </Button>
      <Button
        size="md"
        color="#302f37"
        component={Link}
        to={`/timeline/${projId}`}
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
          {Timeline ? (
            <svg
              width="30"
              height="30"
              style={{ marginBottom: "6px" }}
              viewBox="0 0 408 355"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53.175 0V106.35H17.725V0H53.175ZM17.725 354.5H53.175V248.15H17.725V354.5ZM70.9 177.25C70.9 170.239 68.8209 163.385 64.9256 157.555C61.0303 151.725 55.4938 147.182 49.0161 144.498C42.5385 141.815 35.4107 141.113 28.5341 142.481C21.6574 143.849 15.3408 147.225 10.3831 152.183C5.42531 157.141 2.04902 163.457 0.681178 170.334C-0.686668 177.211 0.0153598 184.338 2.69849 190.816C5.38161 197.294 9.92533 202.83 15.755 206.726C21.5848 210.621 28.4387 212.7 35.45 212.7C55.1248 212.7 70.9 196.925 70.9 177.25ZM407.675 70.9V283.6C407.675 303.275 391.9 319.05 372.225 319.05H159.525C150.123 319.05 141.106 315.315 134.458 308.667C127.81 302.019 124.075 293.002 124.075 283.6V212.7L88.625 177.25L124.075 141.8V70.9C124.075 61.4981 127.81 52.4812 134.458 45.8331C141.106 39.1849 150.123 35.45 159.525 35.45H372.225C391.9 35.45 407.675 51.2253 407.675 70.9ZM319.05 194.975H177.25V230.425H319.05V194.975ZM354.5 124.075H177.25V159.525H354.5V124.075Z"
                fill="url(#paint0_linear_1850_14962)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1850_14962"
                  x1="203.837"
                  y1="0"
                  x2="203.837"
                  y2="354.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
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
                fill="var(--color-white)"
              />
            </svg>
          )}

          <span style={{ color: Timeline ? "#ff8344" : "var(--color-white)" }}>
            Timeline
          </span>
        </div>
      </Button>
      <Button
        size="md"
        component={Link}
        to={`/planMap/${projId}`}
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
          {PlanMap ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 405 426"
              style={{ marginBottom: "6px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M293.17 0C263.559 0.0329915 235.171 11.6004 214.233 32.1645C193.296 52.7286 181.518 80.61 181.484 109.692C181.484 203.554 283.017 274.442 287.344 277.409C289.051 278.583 291.085 279.213 293.17 279.213C295.254 279.213 297.288 278.583 298.995 277.409C303.323 274.442 404.855 203.554 404.855 109.692C404.821 80.61 393.044 52.7286 372.106 32.1645C351.168 11.6004 322.78 0.0329915 293.17 0ZM293.17 69.804C301.202 69.804 309.054 72.1434 315.733 76.5264C322.412 80.9093 327.617 87.139 330.691 94.4276C333.765 101.716 334.569 109.736 333.002 117.474C331.435 125.211 327.567 132.319 321.887 137.897C316.208 143.476 308.971 147.275 301.093 148.814C293.215 150.353 285.049 149.563 277.628 146.544C270.207 143.525 263.864 138.412 259.401 131.853C254.939 125.293 252.557 117.581 252.557 109.692C252.557 99.1131 256.836 88.9674 264.452 81.487C272.068 74.0065 282.399 69.804 293.17 69.804Z"
                fill="url(#paint0_linear_1850_14947)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M156.527 181.346H35.9172C36.3147 174.134 36.8734 167.605 37.6585 161.637C40.2748 141.753 45.1147 130.8 52.8365 122.904C60.5758 115.013 71.3025 110.071 90.763 107.399C96.6032 106.597 102.993 106.027 110.051 105.621V134.953C110.051 144.808 117.872 152.797 127.52 152.797C130.086 152.797 132.523 152.231 134.718 151.216C145.086 142.485 144.703 129.28 144.244 113.425C144.145 110.021 144.043 106.494 144.043 102.864C144.043 85.3125 140.477 81.6699 137.17 78.2921C131.584 72.5858 121.625 70.3152 111.668 69.8047C102.387 70.2633 93.8811 70.9629 86.1089 72.03C62.7659 75.2349 43.4493 82.0451 28.1414 97.6603L28.1287 97.6732C12.8369 113.304 6.17006 133.039 3.03277 156.884C1.54962 168.156 0.791699 180.94 0.404437 195.355C0.139613 196.59 5.69978e-05 197.873 5.69978e-05 199.19C5.69978e-05 200.219 0.0853578 201.228 0.249131 202.209C-0.000273648 215.485 -0.000138796 230.068 8.92954e-06 246.04V248.688C-0.00038448 285.417 -0.000699335 314.799 3.03277 337.854C6.16949 361.694 12.8355 381.431 28.1329 397.049C43.4347 412.679 62.7563 419.495 86.1017 422.702C97.1374 424.218 109.652 424.992 123.764 425.388C124.974 425.659 126.231 425.802 127.52 425.802C128.528 425.802 129.516 425.715 130.477 425.547C143.475 425.802 157.751 425.802 173.388 425.802H174.685C184.332 425.802 192.153 417.813 192.153 407.958C192.153 391.395 198.595 375.51 210.061 363.798C221.527 352.086 237.078 345.506 253.293 345.506C262.94 345.506 270.761 337.517 270.761 327.663C270.761 317.808 262.94 309.819 253.293 309.819C227.812 309.819 203.374 320.159 185.356 338.563C171.514 352.703 162.332 370.713 158.819 390.104C154.009 390.094 149.403 390.076 144.988 390.042V217.033L150.556 216.996C158.54 216.996 174.508 213.573 174.508 199.881C174.508 199.047 174.475 198.243 174.41 197.468C173.371 186.525 164.288 182.398 156.527 181.346ZM35.0081 217.033C34.9402 226.282 34.9371 236.355 34.9371 247.367C34.9371 285.723 34.9742 312.699 37.6585 333.101C40.2756 352.991 45.1169 363.934 52.8329 371.81C60.5634 379.706 71.29 384.659 90.7585 387.333C96.5999 388.135 102.992 388.707 110.051 389.113V217.033H35.0081Z"
                fill="url(#paint1_linear_1850_14947)"
              />
              <path
                d="M331.902 283.055C317.927 283.055 313.968 295.043 313.968 300.991C313.595 313.327 312.922 323.88 311.709 333.093C309.091 352.977 304.236 363.935 296.509 371.822C287.917 380.609 275.604 385.745 251.581 388.161C241.98 389.127 234.963 397.86 235.908 407.667C236.854 417.474 245.403 424.642 255.005 423.676C282.077 420.953 304.163 414.494 321.228 397.041C336.526 381.419 343.196 361.688 346.335 337.85C347.888 326.051 348.647 312.597 349.017 297.348C347.838 291.171 343.446 283.055 331.902 283.055Z"
                fill="url(#paint2_linear_1850_14947)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1850_14947"
                  x1="293.17"
                  y1="0"
                  x2="293.17"
                  y2="279.213"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1850_14947"
                  x1="174.508"
                  y1="69.8047"
                  x2="174.508"
                  y2="425.802"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1850_14947"
                  x1="174.508"
                  y1="69.8047"
                  x2="174.508"
                  y2="425.802"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
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
                fill="var(--color-white)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M130.136 150.765H29.8614C30.1919 144.769 30.6563 139.341 31.3091 134.38C33.4843 117.848 37.5081 108.742 43.9279 102.178C50.3624 95.6175 59.2805 91.5083 75.4599 89.287C80.3154 88.6203 85.6281 88.1459 91.4961 87.8084V112.195C91.4961 120.388 97.9984 127.03 106.019 127.03C108.153 127.03 110.179 126.56 112.004 125.715C120.624 118.457 120.306 107.479 119.924 94.2971C119.842 91.4672 119.757 88.5346 119.757 85.5163C119.757 70.9247 116.792 67.8964 114.043 65.0881C109.398 60.344 101.119 58.4563 92.8401 58.0319C85.124 58.4131 78.0523 58.9948 71.5905 59.8819C52.1832 62.5464 36.1235 68.2083 23.3966 81.1904L23.3861 81.2012C10.6726 94.1962 5.12975 110.604 2.52143 130.428C1.28835 139.799 0.658215 150.427 0.336247 162.412C0.116073 163.438 4.73877e-05 164.505 4.73877e-05 165.6C4.73877e-05 166.455 0.070966 167.294 0.207126 168.11C-0.00022751 179.147 -0.000115394 191.271 7.42397e-06 204.55V206.752C-0.000319655 237.288 -0.000581424 261.715 2.52143 280.882C5.12928 300.702 10.6714 317.112 23.3896 330.096C36.1114 343.09 52.1752 348.756 71.5845 351.423C80.7595 352.683 91.1644 353.327 102.897 353.656C103.903 353.881 104.948 354 106.019 354C106.857 354 107.679 353.928 108.478 353.788C119.284 354 131.153 354 144.154 354H145.232C153.253 354 159.755 347.358 159.755 339.165C159.755 325.395 165.111 312.189 174.643 302.451C184.176 292.714 197.105 287.244 210.586 287.244C218.607 287.244 225.11 280.602 225.11 272.409C225.11 264.216 218.607 257.575 210.586 257.575C189.401 257.575 169.084 266.171 154.104 281.472C142.596 293.227 134.962 308.201 132.041 324.322C128.042 324.313 124.213 324.298 120.543 324.27V180.434L125.172 180.403C131.81 180.403 145.085 177.557 145.085 166.174C145.085 165.481 145.057 164.813 145.004 164.168C144.139 155.07 136.588 151.639 130.136 150.765ZM29.1055 180.434C29.0491 188.124 29.0465 196.498 29.0465 205.653C29.0465 237.541 29.0774 259.969 31.3091 276.93C33.4849 293.467 37.51 302.564 43.925 309.112C50.3521 315.677 59.2701 319.794 75.4561 322.018C80.3126 322.685 85.6266 323.16 91.4961 323.498V180.434H29.1055Z"
                fill="var(--color-white)"
              />
              <path
                d="M275.942 235.323C264.323 235.323 261.031 245.29 261.031 250.235C260.721 260.491 260.162 269.265 259.153 276.924C256.977 293.456 252.94 302.565 246.516 309.122C239.372 316.428 229.135 320.698 209.163 322.706C201.181 323.509 195.347 330.77 196.133 338.923C196.919 347.077 204.027 353.036 212.009 352.233C234.518 349.969 252.88 344.599 267.068 330.089C279.786 317.102 285.331 300.697 287.941 280.879C289.232 271.07 289.863 259.884 290.171 247.206C289.191 242.071 285.539 235.323 275.942 235.323Z"
                fill="var(--color-white)"
              />
            </svg>
          )}

          <span style={{ color: PlanMap ? "#ff8344" : "var(--color-white)" }}>
            Plan Map
          </span>
        </div>
      </Button>
      <Button
        size="md"
        color="#302f37"
        component={Link}
        to={`/projBudget/${projId}`}
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
          {Budget ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 349 338"
              style={{ marginBottom: "6px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M344.278 231.464C352.215 242.249 349.913 257.397 339.127 265.334L262.419 321.865C248.241 332.286 231.154 337.921 213.522 337.921H19.3891C8.6645 337.921 0 329.257 0 318.532V279.755C0 269.03 8.6645 260.366 19.3891 260.366H41.6866L68.8919 238.553C82.646 227.526 99.7327 221.588 117.365 221.588H213.28C224.005 221.588 232.669 230.252 232.669 240.977C232.669 251.701 224.005 260.366 213.28 260.366H164.807C159.475 260.366 155.113 264.728 155.113 270.06C155.113 275.392 159.475 279.755 164.807 279.755H237.88L310.407 226.314C321.193 218.377 336.34 220.679 344.278 231.464Z"
                fill="url(#paint0_linear_1850_14967)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M171.518 199.68C226.658 199.68 271.358 154.98 271.358 99.8402C271.358 44.7 226.658 0 171.518 0C116.378 0 71.6777 44.7 71.6777 99.8402C71.6777 154.98 116.378 199.68 171.518 199.68ZM188.586 43.2038V36.7988H188.465C188.465 28.6857 181.997 22.1587 173.958 22.1587C165.919 22.1587 159.451 28.6857 159.451 36.7988V43.5698C155.281 44.6678 151.11 46.2538 147.242 48.5718C138.296 53.9398 130.438 63.5168 130.498 77.4858C130.559 90.9669 138.417 99.4459 146.577 104.387C153.467 108.596 162.051 111.219 168.579 113.171L169.727 113.537C177.464 115.916 182.662 117.624 186.107 119.82C188.525 121.345 188.525 122.016 188.525 122.626V122.748C188.586 124.151 188.283 124.883 188.042 125.249C187.8 125.676 187.256 126.286 186.107 127.018C183.629 128.543 179.338 129.702 174.502 129.519C168.155 129.275 162.232 127.262 154.011 124.456C153.295 124.204 152.562 123.953 151.804 123.693C151.093 123.448 150.36 123.197 149.599 122.931C141.983 120.369 133.762 124.517 131.224 132.203C128.685 139.889 132.795 148.185 140.411 150.747C141.171 150.989 141.957 151.258 142.769 151.535C143.185 151.678 143.608 151.822 144.038 151.967C144.299 152.056 144.563 152.146 144.83 152.237C149.127 153.704 154.105 155.404 159.512 156.725V163.679C159.512 171.792 165.979 178.319 174.019 178.319C182.058 178.319 188.525 171.792 188.525 163.679V157.213C192.998 156.115 197.35 154.346 201.4 151.845C210.648 145.989 217.72 135.985 217.539 122.26C217.357 108.84 209.862 100.117 201.581 94.8709C194.328 90.2959 185.382 87.5509 178.673 85.5379L178.129 85.3549C170.271 82.9759 165.073 81.3289 161.567 79.1938C160.302 78.4492 159.818 77.8901 159.635 77.6782C159.608 77.6471 159.588 77.6235 159.572 77.6078V77.2418C159.572 76.2658 159.814 75.8388 159.995 75.5338C160.237 75.1678 160.842 74.4968 162.111 73.7038C164.952 72.0568 169.425 70.9588 173.837 71.0198C179.338 71.0808 185.503 72.3008 192.091 74.0698C199.828 76.1438 207.807 71.5078 209.862 63.6998C211.917 55.8918 207.324 47.8398 199.587 45.7658C196.202 44.8508 192.454 43.9358 188.586 43.2038Z"
                fill="url(#paint1_linear_1850_14967)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1850_14967"
                  x1="174.5"
                  y1="221.588"
                  x2="174.5"
                  y2="337.921"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1850_14967"
                  x1="171.518"
                  y1="0"
                  x2="171.518"
                  y2="199.68"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9A754" />
                  <stop offset="0.5" stop-color="#F26B27" />
                  <stop offset="1" stop-color="#EF4E59" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
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
                fill="var(--color-white)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M531.432 618.33C702.128 618.33 840.504 479.953 840.504 309.257C840.504 138.561 702.128 0.18457 531.432 0.18457C360.736 0.18457 222.359 138.561 222.359 309.257C222.359 479.953 360.736 618.33 531.432 618.33ZM584.268 133.929V114.101H583.894C583.894 88.9862 563.872 68.7807 538.986 68.7807C514.099 68.7807 494.078 88.9862 494.078 114.101V135.062C481.167 138.461 468.256 143.371 456.28 150.547C428.587 167.165 404.262 196.812 404.449 240.055C404.636 281.788 428.961 308.036 454.222 323.332C475.553 336.362 502.124 344.482 522.332 350.525L525.888 351.658C549.839 359.022 565.931 364.31 576.596 371.108C584.081 375.829 584.081 377.906 584.081 379.794V380.172C584.268 384.515 583.332 386.781 582.584 387.914C581.836 389.236 580.152 391.124 576.596 393.391C568.924 398.111 555.639 401.699 540.67 401.133C521.023 400.377 502.685 394.146 477.237 385.459C475.018 384.68 472.749 383.901 470.405 383.097C468.203 382.341 465.934 381.562 463.578 380.738C440.001 372.807 414.553 385.648 406.694 409.442C398.836 433.235 411.559 458.917 435.136 466.848C437.487 467.597 439.92 468.429 442.435 469.289C443.723 469.729 445.032 470.177 446.363 470.625C447.172 470.9 447.99 471.18 448.815 471.461C462.117 476.003 477.528 481.264 494.265 485.354V506.881C494.265 531.996 514.286 552.202 539.173 552.202C564.059 552.202 584.081 531.996 584.081 506.881V486.865C597.928 483.465 611.4 477.989 623.937 470.247C652.566 452.119 674.458 421.149 673.897 378.661C673.335 337.117 650.133 310.114 624.498 293.874C602.044 279.711 574.351 271.213 553.581 264.982L551.897 264.415C527.572 257.051 511.48 251.952 500.627 245.343C496.711 243.038 495.214 241.307 494.647 240.651C494.563 240.555 494.5 240.481 494.452 240.433V239.3C494.452 236.279 495.201 234.957 495.762 234.013C496.51 232.88 498.382 230.802 502.311 228.348C511.106 223.249 524.952 219.85 538.612 220.039C555.639 220.228 574.725 224.004 595.121 229.481C619.072 235.901 643.771 221.549 650.133 197.378C656.495 173.207 642.274 148.281 618.323 141.86C607.845 139.028 596.244 136.195 584.268 133.929Z"
                fill="var(--color-white)"
              />
            </svg>
          )}

          <span style={{ color: Budget ? "#ff8344" : "var(--color-white)" }}>
            Budget
          </span>
        </div>
      </Button>
    </div>
  );
}

export default BottomBarDesign;
