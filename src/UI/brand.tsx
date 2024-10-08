import React from "react";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="brand w-nav-brand w--current">
      <svg
        width="115"
        height="32"
        viewBox="0 0 115 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_2)">
          <rect width="115" height="32" fill="white" />
          <path
            d="M7.26175 24.192C6.23775 24.192 5.40575 23.872 4.76575 23.232C4.14708 22.592 3.83775 21.632 3.83775 20.352C3.83775 19.8187 3.92308 19.1253 4.09375 18.272L7.51775 2.24L12.2538 1.6L8.57375 18.88C8.48842 19.2 8.44575 19.5413 8.44575 19.904C8.44575 20.3307 8.54175 20.64 8.73375 20.832C8.94708 21.0027 9.28842 21.088 9.75775 21.088C10.3764 21.088 10.9524 20.832 11.4858 20.32C12.0191 19.7867 12.4031 19.104 12.6378 18.272H13.9818C13.1924 20.576 12.1791 22.144 10.9418 22.976C9.70442 23.7867 8.47775 24.192 7.26175 24.192ZM17.201 24.192C15.6223 24.192 14.3957 23.7867 13.521 22.976C12.6463 22.144 12.209 20.8533 12.209 19.104C12.209 17.632 12.497 16.0107 13.073 14.24C13.649 12.4693 14.5877 10.944 15.889 9.664C17.1903 8.36267 18.8437 7.712 20.849 7.712C23.1957 7.712 24.369 8.736 24.369 10.784C24.369 11.9787 24.0277 13.0773 23.345 14.08C22.6623 15.0827 21.7557 15.8933 20.625 16.512C19.4943 17.1093 18.289 17.4507 17.009 17.536C16.9663 18.176 16.945 18.6027 16.945 18.816C16.945 19.8613 17.1263 20.576 17.489 20.96C17.8517 21.3227 18.4383 21.504 19.249 21.504C20.401 21.504 21.3823 21.2373 22.193 20.704C23.025 20.1707 23.9317 19.36 24.913 18.272H26.001C23.633 22.2187 20.6997 24.192 17.201 24.192ZM17.265 16C18.0543 15.9573 18.801 15.68 19.505 15.168C20.2303 14.656 20.8063 14.0053 21.233 13.216C21.681 12.4267 21.905 11.5947 21.905 10.72C21.905 9.84533 21.6383 9.408 21.105 9.408C20.337 9.408 19.5797 10.08 18.833 11.424C18.1077 12.768 17.585 14.2933 17.265 16ZM22.2502 32C21.0769 32 20.1276 31.6693 19.4022 31.008C18.6556 30.368 18.2822 29.504 18.2822 28.416C18.2822 27.52 18.5382 26.784 19.0502 26.208C19.5622 25.632 20.1916 25.1733 20.9382 24.832C21.6849 24.4907 22.6449 24.128 23.8182 23.744L27.3703 6.912C27.9463 4.26667 28.9063 2.464 30.2503 1.504C31.5943 0.522666 33.1303 0.0319996 34.8583 0.0319996C36.4583 0.0319996 37.8129 0.298666 38.9223 0.831999C40.0316 1.36533 40.5863 2.32533 40.5863 3.712C40.5863 4.608 40.3409 5.26933 39.8503 5.696C39.3809 6.10133 38.7836 6.304 38.0583 6.304C37.5036 6.304 37.0449 6.176 36.6823 5.92C36.3196 5.64267 36.1383 5.19467 36.1383 4.576C36.1383 4.17067 36.2343 3.808 36.4263 3.488C36.6396 3.168 36.9063 3.008 37.2263 3.008C37.3756 3.008 37.4609 3.01867 37.4823 3.04C37.4609 2.61333 37.2903 2.29333 36.9703 2.08C36.6716 1.86666 36.2556 1.76 35.7223 1.76C34.7836 1.76 34.0263 2.10133 33.4503 2.784C32.8956 3.46667 32.5223 4.33067 32.3303 5.376L31.7863 8H34.3463L34.0903 9.28H31.5303L27.8823 26.56C27.4556 28.5653 26.7196 29.9733 25.6743 30.784C24.6289 31.5947 23.4876 32 22.2502 32ZM36.6183 24.192C35.5943 24.192 34.7623 23.872 34.1223 23.232C33.5036 22.592 33.1943 21.632 33.1943 20.352C33.1943 19.8187 33.2796 19.1253 33.4503 18.272L35.6263 8H40.2343L37.9303 18.88C37.8449 19.2 37.8023 19.5413 37.8023 19.904C37.8023 20.3307 37.8983 20.64 38.0903 20.832C38.3036 21.0027 38.6449 21.088 39.1143 21.088C39.7329 21.088 40.3089 20.832 40.8423 20.32C41.3756 19.7867 41.7596 19.104 41.9943 18.272H43.3383C42.5489 20.576 41.5356 22.144 40.2983 22.976C39.0609 23.7867 37.8343 24.192 36.6183 24.192ZM21.3542 29.152C21.7169 29.152 22.0796 28.9493 22.4422 28.544C22.7836 28.1387 23.0396 27.5093 23.2102 26.656L23.5942 24.8C22.5062 25.1413 21.6422 25.568 21.0022 26.08C20.3622 26.6133 20.0422 27.2107 20.0422 27.872C20.0422 28.3413 20.1916 28.672 20.4902 28.864C20.7889 29.056 21.0769 29.152 21.3542 29.152ZM46.576 24.192C44.9973 24.192 43.7707 23.7867 42.896 22.976C42.0213 22.144 41.584 20.8533 41.584 19.104C41.584 17.632 41.872 16.0107 42.448 14.24C43.0453 12.4693 43.984 10.944 45.264 9.664C46.5653 8.36267 48.208 7.712 50.192 7.712C51.472 7.712 52.3787 7.98933 52.912 8.544C53.4667 9.09867 53.744 9.80267 53.744 10.656C53.744 11.4027 53.584 11.9787 53.264 12.384C52.944 12.7893 52.5387 12.992 52.048 12.992C51.6853 12.992 51.312 12.864 50.928 12.608C51.184 11.904 51.312 11.2747 51.312 10.72C51.312 10.3147 51.2373 9.99467 51.088 9.76C50.9387 9.52533 50.7147 9.408 50.416 9.408C49.776 9.408 49.136 9.93067 48.496 10.976C47.856 12.0213 47.3333 13.2907 46.928 14.784C46.5227 16.2773 46.32 17.6213 46.32 18.816C46.32 19.8613 46.5013 20.576 46.864 20.96C47.2267 21.3227 47.8133 21.504 48.624 21.504C49.776 21.504 50.7573 21.2373 51.568 20.704C52.4 20.1707 53.3067 19.36 54.288 18.272H55.376C53.008 22.2187 50.0747 24.192 46.576 24.192ZM65.8333 24.192C64.5319 24.192 63.5719 23.8507 62.9533 23.168C62.3559 22.464 62.0573 21.6 62.0573 20.576C62.0573 20.128 62.1106 19.6267 62.2173 19.072C62.3239 18.496 62.4306 17.9413 62.5373 17.408C62.6653 16.8747 62.7506 16.5333 62.7933 16.384C62.9639 15.6373 63.1239 14.9013 63.2733 14.176C63.4226 13.4507 63.4973 12.864 63.4973 12.416C63.4973 11.328 63.1133 10.784 62.3453 10.784C61.7906 10.784 61.2999 11.0613 60.8733 11.616C60.4466 12.1493 60.1053 12.8533 59.8493 13.728L57.6733 24H53.0652L57.7053 2.24L62.4413 1.6L60.7133 9.664C61.7799 8.46933 63.0279 7.872 64.4573 7.872C65.5453 7.872 66.4093 8.17067 67.0493 8.768C67.6893 9.36533 68.0093 10.272 68.0093 11.488C68.0093 12.1067 67.9346 12.8 67.7853 13.568C67.6359 14.3147 67.4226 15.232 67.1453 16.32C66.9746 16.9813 66.8146 17.632 66.6653 18.272C66.5373 18.8907 66.4733 19.3813 66.4733 19.744C66.4733 20.1707 66.5693 20.5013 66.7613 20.736C66.9533 20.9707 67.2839 21.088 67.7533 21.088C68.3933 21.088 68.9053 20.864 69.2893 20.416C69.6733 19.9467 70.0573 19.232 70.4412 18.272H71.7853C70.9959 20.6187 70.0786 22.1973 69.0333 23.008C68.0093 23.7973 66.9426 24.192 65.8333 24.192ZM75.0135 24.192C73.4348 24.192 72.2082 23.7867 71.3335 22.976C70.4588 22.144 70.0215 20.8533 70.0215 19.104C70.0215 17.632 70.3095 16.0107 70.8855 14.24C71.4615 12.4693 72.4002 10.944 73.7015 9.664C75.0028 8.36267 76.6562 7.712 78.6615 7.712C81.0082 7.712 82.1815 8.736 82.1815 10.784C82.1815 11.9787 81.8402 13.0773 81.1575 14.08C80.4748 15.0827 79.5682 15.8933 78.4375 16.512C77.3068 17.1093 76.1015 17.4507 74.8215 17.536C74.7788 18.176 74.7575 18.6027 74.7575 18.816C74.7575 19.8613 74.9388 20.576 75.3015 20.96C75.6642 21.3227 76.2508 21.504 77.0615 21.504C78.2135 21.504 79.1948 21.2373 80.0055 20.704C80.8375 20.1707 81.7442 19.36 82.7255 18.272H83.8135C81.4455 22.2187 78.5122 24.192 75.0135 24.192ZM75.0775 16C75.8668 15.9573 76.6135 15.68 77.3175 15.168C78.0428 14.656 78.6188 14.0053 79.0455 13.216C79.4935 12.4267 79.7175 11.5947 79.7175 10.72C79.7175 9.84533 79.4508 9.408 78.9175 9.408C78.1495 9.408 77.3922 10.08 76.6455 11.424C75.9202 12.768 75.3975 14.2933 75.0775 16ZM85.8868 24.192C84.8628 24.192 84.0308 23.872 83.3908 23.232C82.7721 22.592 82.4627 21.632 82.4627 20.352C82.4627 19.8187 82.5481 19.1253 82.7188 18.272L84.8948 8H89.5028L87.1988 18.88C87.1348 19.2 87.1028 19.4987 87.1028 19.776C87.1028 20.6507 87.4228 21.088 88.0628 21.088C88.6601 21.088 89.1721 20.8427 89.5988 20.352C90.0254 19.84 90.3668 19.1467 90.6228 18.272L92.7988 8H97.4068L95.1028 18.88C95.0174 19.2 94.9748 19.5413 94.9748 19.904C94.9748 20.3307 95.0708 20.64 95.2628 20.832C95.4761 21.0027 95.8174 21.088 96.2868 21.088C96.8841 21.088 97.3961 20.832 97.8228 20.32C98.2708 19.808 98.6228 19.1253 98.8787 18.272H100.223C99.4334 20.576 98.4521 22.144 97.2788 22.976C96.1268 23.7867 94.9641 24.192 93.7908 24.192C92.8734 24.192 92.1374 23.936 91.5828 23.424C91.0494 22.912 90.7294 22.1547 90.6228 21.152C89.8974 22.3253 89.1294 23.1253 88.3188 23.552C87.5294 23.9787 86.7188 24.192 85.8868 24.192ZM101.051 8H105.659L105.243 9.984C105.968 9.344 106.619 8.85333 107.195 8.512C107.792 8.17067 108.432 8 109.115 8C109.798 8 110.331 8.23467 110.715 8.704C111.12 9.17333 111.323 9.73867 111.323 10.4C111.323 11.0187 111.12 11.5627 110.715 12.032C110.31 12.5013 109.744 12.736 109.019 12.736C108.55 12.736 108.23 12.6293 108.059 12.416C107.91 12.1813 107.792 11.8507 107.707 11.424C107.643 11.1467 107.579 10.944 107.515 10.816C107.451 10.688 107.334 10.624 107.163 10.624C106.715 10.624 106.331 10.72 106.011 10.912C105.712 11.0827 105.318 11.392 104.827 11.84L102.267 24H97.659L101.051 8Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="115" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
}
