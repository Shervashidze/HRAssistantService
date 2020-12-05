﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningService.Models
{
    public class Worker
    {
        public long Id { get; set; }

        public long LearningEventId { get; set; }

        public string Feedback { get; set; }

        public int? InitialScore { get; set; }

        public int? AfterwardsScore { get; set; }
    }
}