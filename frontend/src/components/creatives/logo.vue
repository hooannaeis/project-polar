<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    :style="svgStyle"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g transform="matrix(1,0,0,1,26.8482,21.5018)">
      <g id="sad" transform="matrix(2.46669,0,0,2.46669,-855.197,-262.347)">
        <g transform="matrix(0.850614,0,0,0.850614,290.077,-44.8956)">
          <path
            d="M73.581,185.767C73.581,185.767 192.07,235.362 293.896,185.767C294.358,187.124 270.901,394.567 176.517,392.955C94.25,391.55 73.581,185.767 73.581,185.767Z"
            style="fill:white;stroke:black;stroke-width:6.67px;"
          />
        </g>
        <g transform="matrix(0.309911,0,0,-0.212924,390.839,291.763)">
          <path
            d="M32.578,211.538C32.578,211.538 165.393,381.13 314.372,195.417C275.892,329.272 222.569,406.988 167.107,405.346C101.761,403.412 32.578,211.538 32.578,211.538Z"
            style="fill:white;stroke:black;stroke-width:21.35px;"
          />
        </g>
        <g transform="matrix(0.514255,0.156891,0.248214,-0.813594,272.154,313.58)">
          <path
            d="M97.741,201.196C97.741,201.196 140.331,235.292 208.431,222.542"
            style="fill:none;stroke:black;stroke-width:7.98px;"
          />
        </g>
        <g transform="matrix(-0.514255,0.156891,-0.248214,-0.813594,619.526,313.58)">
          <path
            d="M97.741,201.196C97.741,201.196 139.949,235.218 208.049,222.468"
            style="fill:none;stroke:black;stroke-width:7.98px;"
          />
        </g>
      </g>
      <g id="happy" transform="matrix(2.43379,-0.401542,0.401542,2.43379,-63.9021,-345.172)">
        <g transform="matrix(1,0,0,0.947696,1.42109e-14,20.5535)">
          <path
            d="M73.581,185.767C73.581,185.767 192.07,235.362 293.896,185.767C294.358,187.124 270.901,394.567 176.517,392.955C94.25,391.55 73.581,185.767 73.581,185.767Z"
            style="fill:white;stroke:black;stroke-width:5.83px;"
          />
        </g>
        <g transform="matrix(0.549687,0,0,0.377662,85.4294,222.223)">
          <path
            d="M53.968,193.671C53.968,193.671 177.946,280.596 300.8,193.671C262.32,327.526 228.45,390.832 172.988,389.19C107.642,387.255 53.968,193.671 53.968,193.671Z"
            style="fill:white;stroke:black;stroke-width:12.04px;"
          />
        </g>
        <g transform="matrix(1,-5.55112e-17,5.55112e-17,1,0.869076,40.8626)">
          <path
            d="M97.741,201.196C97.741,201.196 142.446,230.477 210.546,217.726"
            style="fill:white;stroke:black;stroke-width:5.68px;"
          />
        </g>
        <g transform="matrix(1,-1.66533e-16,1.66533e-16,1,-8.57814,44.0994)">
          <path
            d="M270.696,200.196C270.696,200.196 270.201,200.534 253.887,206.732"
            style="fill:white;stroke:black;stroke-width:5.68px;"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    viewBox: {
      type: String,
      default: '0 0 800 600'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    iconColor: {
      type: String,
      default: '#f6f6f6'
    },
    strokeWidth: {
      type: String,
      default: '4px'
    },
    iconFillColor: {
      type: String,
      default: '#f6f6f6'
    },
    svgStyle: {
      type: String,
      default: ''
    }
  }
};
</script>
