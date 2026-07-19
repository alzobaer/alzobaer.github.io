---
layout: archive
title: "CV"
permalink: /vitae/
author_profile: true
redirect_from:
  - /resume
  - /cv-page
---

{% include base_path %}

Education
======
* Ph.D. in Informatics, Shizuoka University — Mineno Laboratory (planned)
* M.S. in Informatics, Shizuoka University — Mineno Laboratory, 2026 (expected)
* B.Sc. in Engineering, Computer Science and Engineering — University of Rajshahi, Bangladesh, 2024

Research interests
======
* Scale-invariant 3D plant phenotyping; 3D Gaussian Splatting and neural rendering
* Autonomous agricultural robotics (UGV); time-series crop monitoring

Research experience
======
* 2024&ndash;present: Graduate Researcher, Mineno Laboratory, Shizuoka University
  * Autonomous data acquisition and scale-invariant render-space phenotyping for greenhouse crop monitoring
  * Developed a low-cost self-charging UGV and a 3DGS-based measurement pipeline
  * Validated on a 49-day commercial-greenhouse dataset (2.86&times; cross-session stability gain)

Skills
======
* Programming: Python, C/C++, Bash, LaTeX
* Computer vision / 3D: Structure-from-Motion (COLMAP), 3D Gaussian Splatting, NeRF, OpenCV, PyTorch
* Robotics: ROS / ROS 2, Pixhawk / PX4, MAVROS, autonomous navigation and docking
* Tools: Git / GitHub, Linux, data analysis and visualization

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Awards and honors
======
* Asia Bridge Program (ABP) Scholarship, 2024
