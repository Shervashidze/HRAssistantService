﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coursework.Models
{
    public interface IEntity<TKey>
    {
        TKey Id { get; set; }
    }
}
