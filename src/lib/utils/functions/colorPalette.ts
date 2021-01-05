const COLOR_PALETTE_EVEN: string[] = [
  'hsl(183, 38%, 43%)',
  'hsl(183, 38%, 53%)',
  'hsl(183, 38%, 63%)',
  'hsl(183, 38%, 72%)',
  'hsl(183, 37%, 81%)',

  'hsl(204, 33%, 78%)',
  'hsl(203, 34%, 66%)',
  'hsl(203, 34%, 55%)',
  'hsl(203, 43%, 44%)',
  'hsl(203, 43%, 36%)',

  'hsl(332, 57%, 42%)',
  'hsl(332, 56%, 52%)',
  'hsl(332, 56%, 62%)',
  'hsl(333, 56%, 72%)',
  'hsl(331, 55%, 81%)',

  'hsl(256, 22%, 74%)',
  'hsl(256, 22%, 61%)',
  'hsl(256, 24%, 48%)',
  'hsl(256, 40%, 40%)',
  'hsl(256, 42%, 32%)',

  'hsl(39, 76%, 45%)',
  'hsl(39, 75%, 50%)',
  'hsl(38, 75%, 60%)',
  'hsl(38, 78%, 65%)',
  'hsl(39, 78%, 75%)',

  'hsl(174, 38%, 73%)',
  'hsl(175, 38%, 59%)',
  'hsl(175, 45%, 46%)',
  'hsl(175, 80%, 32%)',
  'hsl(175, 80%, 25%)',

  'hsl(218, 28%, 25%)',
  'hsl(218, 25%, 31%)',
  'hsl(219, 14%, 45%)',
  'hsl(219, 11%, 59%)',
  'hsl(218, 11%, 73%)',

  'hsl(26, 68%, 79%)',
  'hsl(26, 68%, 68%)',
  'hsl(26, 68%, 58%)',
  'hsl(26, 75%, 47%)',
  'hsl(26, 89%, 39%)',

  'hsl(120, 29%, 40%)',
  'hsl(120, 29%, 49%)',
  'hsl(120, 28%, 59%)',
  'hsl(120, 28%, 69%)',
  'hsl(120, 28%, 79%)',

  'hsl(223, 47%, 81%)',
  'hsl(223, 46%, 72%)',
  'hsl(223, 47%, 63%)',
  'hsl(223, 47%, 54%)',
  'hsl(223, 47%, 45%)',

  'hsl(357, 66%, 35%)',
  'hsl(357, 66%, 42%)',
  'hsl(357, 48%, 54%)',
  'hsl(358, 48%, 65%)',
  'hsl(357, 48%, 77%)',

  'hsl(183, 37%, 79%)',
  'hsl(183, 38%, 72%)',
  'hsl(183, 38%, 63%)',
  'hsl(183, 38%, 53%)',
  'hsl(183, 38%, 45%)',

  'hsl(203, 43%, 38%)',
  'hsl(203, 43%, 44%)',
  'hsl(203, 34%, 55%)',
  'hsl(203, 34%, 66%)',
  'hsl(204, 33%, 75%)',

  'hsl(331, 55%, 81%)',
  'hsl(333, 56%, 72%)',
  'hsl(332, 56%, 62%)',
  'hsl(332, 56%, 52%)',
  'hsl(332, 56%, 44%)',

  'hsl(256, 42%, 28%)',
  'hsl(256, 42%, 35%)',
  'hsl(256, 24%, 48%)',
  'hsl(256, 22%, 61%)',
  'hsl(256, 22%, 74%)',

  'hsl(39, 75%, 80%)',
  'hsl(38, 74%, 70%)',
  'hsl(38, 75%, 60%)',
  'hsl(39, 75%, 50%)',
  'hsl(39, 75%, 40%)',

  'hsl(175, 80%, 28%)',
  'hsl(175, 80%, 32%)',
  'hsl(175, 45%, 46%)',
  'hsl(175, 38%, 59%)',
  'hsl(174, 38%, 73%)',

  'hsl(218, 11%, 73%)',
  'hsl(219, 11%, 59%)',
  'hsl(219, 14%, 45%)',
  'hsl(218, 25%, 31%)',
  'hsl(218, 25%, 25%)',

  'hsl(26, 75%, 37%)',
  'hsl(26, 75%, 47%)',
  'hsl(26, 68%, 58%)',
  'hsl(26, 68%, 68%)',
  'hsl(26, 68%, 79%)',

  'hsl(120, 28%, 79%)',
  'hsl(120, 28%, 69%)',
  'hsl(120, 28%, 59%)',
  'hsl(120, 29%, 49%)',
  'hsl(120, 29%, 39%)',

  'hsl(223, 47%, 45%)',
  'hsl(223, 47%, 54%)',
  'hsl(223, 47%, 63%)',
  'hsl(223, 46%, 72%)',
  'hsl(223, 47%, 81%)',

  'hsl(357, 48%, 77%)',
  'hsl(358, 48%, 65%)',
  'hsl(357, 48%, 54%)',
  'hsl(357, 66%, 42%)',
  'hsl(357, 66%, 38%)',
]

const COLOR_PALETTE_ODD: string[] = [
  'hsl(203, 43%, 34%)',
  'hsl(203, 43%, 44%)',
  'hsl(203, 34%, 55%)',
  'hsl(203, 34%, 66%)',
  'hsl(204, 33%, 78%)',

  'hsl(331, 55%, 81%)',
  'hsl(333, 56%, 72%)',
  'hsl(332, 56%, 62%)',
  'hsl(332, 56%, 52%)',
  'hsl(332, 56%, 45%)',

  'hsl(256, 42%, 25%)',
  'hsl(256, 42%, 35%)',
  'hsl(256, 24%, 48%)',
  'hsl(256, 22%, 61%)',
  'hsl(256, 22%, 74%)',

  'hsl(39, 75%, 80%)',
  'hsl(38, 74%, 70%)',
  'hsl(38, 75%, 60%)',
  'hsl(39, 75%, 50%)',
  'hsl(39, 75%, 40%)',

  'hsl(175, 80%, 25%)',
  'hsl(175, 80%, 32%)',
  'hsl(175, 45%, 46%)',
  'hsl(175, 38%, 59%)',
  'hsl(174, 38%, 73%)',

  'hsl(218, 11%, 73%)',
  'hsl(219, 11%, 59%)',
  'hsl(219, 14%, 45%)',
  'hsl(218, 25%, 31%)',
  'hsl(218, 25%, 25%)',

  'hsl(26, 75%, 35%)',
  'hsl(26, 75%, 47%)',
  'hsl(26, 68%, 58%)',
  'hsl(26, 68%, 68%)',
  'hsl(26, 68%, 79%)',

  'hsl(120, 28%, 79%)',
  'hsl(120, 28%, 69%)',
  'hsl(120, 28%, 59%)',
  'hsl(120, 29%, 49%)',
  'hsl(120, 29%, 39%)',

  'hsl(223, 47%, 45%)',
  'hsl(223, 47%, 54%)',
  'hsl(223, 47%, 63%)',
  'hsl(223, 46%, 72%)',
  'hsl(223, 47%, 81%)',

  'hsl(357, 48%, 77%)',
  'hsl(358, 48%, 65%)',
  'hsl(357, 48%, 54%)',
  'hsl(357, 66%, 42%)',
  'hsl(357, 66%, 35%)',

  'hsl(183, 38%, 45%)',
  'hsl(183, 38%, 53%)',
  'hsl(183, 38%, 63%)',
  'hsl(183, 38%, 72%)',
  'hsl(183, 37%, 81%)',

  'hsl(204, 33%, 78%)',
  'hsl(203, 34%, 66%)',
  'hsl(203, 34%, 55%)',
  'hsl(203, 43%, 44%)',
  'hsl(203, 43%, 36%)',

  'hsl(332, 56%, 43%)',
  'hsl(332, 56%, 52%)',
  'hsl(332, 56%, 62%)',
  'hsl(333, 56%, 72%)',
  'hsl(331, 55%, 81%)',

  'hsl(256, 22%, 74%)',
  'hsl(256, 22%, 61%)',
  'hsl(256, 24%, 48%)',
  'hsl(256, 42%, 35%)',
  'hsl(256, 42%, 25%)',

  'hsl(39, 75%, 40%)',
  'hsl(39, 75%, 50%)',
  'hsl(38, 75%, 60%)',
  'hsl(38, 74%, 70%)',
  'hsl(39, 75%, 80%)',

  'hsl(174, 38%, 73%)',
  'hsl(175, 38%, 59%)',
  'hsl(175, 45%, 46%)',
  'hsl(175, 80%, 32%)',
  'hsl(175, 80%, 25%)',

  'hsl(218, 25%, 25%)',
  'hsl(218, 25%, 31%)',
  'hsl(219, 14%, 45%)',
  'hsl(219, 11%, 59%)',
  'hsl(218, 11%, 73%)',

  'hsl(26, 68%, 79%)',
  'hsl(26, 68%, 68%)',
  'hsl(26, 68%, 58%)',
  'hsl(26, 75%, 47%)',
  'hsl(26, 75%, 36%)',

  'hsl(120, 29%, 35%)',
  'hsl(120, 29%, 49%)',
  'hsl(120, 28%, 59%)',
  'hsl(120, 28%, 69%)',
  'hsl(120, 28%, 79%)',

  'hsl(223, 47%, 81%)',
  'hsl(223, 46%, 72%)',
  'hsl(223, 47%, 63%)',
  'hsl(223, 47%, 54%)',
  'hsl(223, 47%, 45%)',

  'hsl(357, 66%, 35%)',
  'hsl(357, 66%, 42%)',
  'hsl(357, 48%, 54%)',
  'hsl(358, 48%, 65%)',
  'hsl(357, 48%, 77%)',

  'hsl(183, 37%, 81%)',
  'hsl(183, 38%, 72%)',
  'hsl(183, 38%, 63%)',
  'hsl(183, 38%, 53%)',
  'hsl(183, 38%, 45%)',
]

export { COLOR_PALETTE_EVEN, COLOR_PALETTE_ODD }
