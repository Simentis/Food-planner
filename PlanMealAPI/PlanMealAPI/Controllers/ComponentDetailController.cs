﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanMealAPI.Models;

namespace PlanMealAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentDetailController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly AuthenticationContext _context;

        public ComponentDetailController(UserManager<ApplicationUser> userManager, AuthenticationContext context)
        {
            _context = context;
            _userManager = userManager;
        }

       // GET: api/ComponentDetail
       [HttpGet]
        public async Task<ActionResult<IEnumerable<ComponentDetail>>> GetComponentDetails()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);  
            return await _context.ComponentDetails.Where(x => x.UserName.Equals(user.UserName.ToString())).ToListAsync();
        }

        // GET: api/ComponentDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComponentDetail>> GetComponentDetail(int id, string UserName)
        {
            
            var componentDetail = await _context.ComponentDetails.FindAsync(id);

            if (componentDetail == null)
            {
                return NotFound();
            }

            return componentDetail;
        }

        // PUT: api/ComponentDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComponentDetail(int id, ComponentDetail componentDetail)
        {
            if (id != componentDetail.ComponentId)
            {
                return BadRequest();
            }

            _context.Entry(componentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComponentDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ComponentDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ComponentDetail>> PostComponentDetail(ComponentDetail componentDetail)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            componentDetail.UserName = user.UserName.ToString();
            _context.ComponentDetails.Add(componentDetail);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComponentDetail", new { id = componentDetail.ComponentId }, componentDetail);
        }

        // DELETE: api/ComponentDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComponentDetail(int id)
        {
            var componentDetail = await _context.ComponentDetails.FindAsync(id);
            if (componentDetail == null)
            {
                return NotFound();
            }

            _context.ComponentDetails.Remove(componentDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComponentDetailExists(int id)
        {
            return _context.ComponentDetails.Any(e => e.ComponentId == id);
        }
    }
}
